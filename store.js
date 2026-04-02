/* ═══════════════════════════════════════════
   sNibaStudy — Store (localStorage abstraction)
   ═══════════════════════════════════════════ */

window.SNS = window.SNS || {};

SNS.store = (function () {

  const PREFIX = 'sniba_';

  const DEFAULTS = {
    profile: {
      name: 'Student',
      avatar: 'S',
      grade: 'Grade 10',
      school: 'NIS',
      level: 1,
      xp: 0,
      joinDate: new Date().toISOString().slice(0, 10)
    },
    settings: {
      notifications: true,
      soundEnabled: true,
      focusHideSidebar: true
    },
    studySessions: [],
    quizScores: {},
    dailyGoals: [],
    studyTime: {},
    savedTopics: [],
    savedSessions: [],
    friends: [
      { id: 'f1', name: 'Asel Nurmagambetova', avatar: 'AN', grade: 'Grade 10', school: 'NIS Almaty', level: 8, xp: 2340, studyTimeToday: 95, streak: 14, status: 'online', subject: 'Physics' },
      { id: 'f2', name: 'Dauren Bekzhanov',    avatar: 'DB', grade: 'Grade 11', school: 'NIS Astana',  level: 12, xp: 3890, studyTimeToday: 150, streak: 21, status: 'busy',   subject: 'Math' },
      { id: 'f3', name: 'Zarina Smagulova',    avatar: 'ZS', grade: 'Grade 10', school: 'NIS Shymkent', level: 6, xp: 1680, studyTimeToday: 30,  streak: 7,  status: 'offline', subject: 'Biology' },
      { id: 'f4', name: 'Arman Tulegenov',     avatar: 'AT', grade: 'Grade 9',  school: 'NIS Karaganda', level: 4, xp: 980,  studyTimeToday: 60,  streak: 3,  status: 'online',  subject: 'English' },
      { id: 'f5', name: 'Madina Ospanova',     avatar: 'MO', grade: 'Grade 11', school: 'NIS Almaty',   level: 10, xp: 3100, studyTimeToday: 120, streak: 18, status: 'online', subject: 'Chemistry' }
    ],
    pomodoroStats: {
      totalSessions: 0,
      totalMinutes: 0,
      todaySessions: 0,
      todayDate: ''
    },
    weakAreas: {},
    flashcardDecks: {},
    streak: {
      current: 0,
      longest: 0,
      lastStudyDate: ''
    },
    achievements: [],
    notifications: [
      { id: 'n1', text: 'Welcome to sNibaStudy! Start your first study session.', time: new Date().toISOString(), read: false },
      { id: 'n2', text: 'Dauren Bekzhanov just overtook you on the leaderboard!', time: new Date(Date.now() - 3600000).toISOString(), read: false },
      { id: 'n3', text: 'Your streak is at 0. Study today to start a new streak!', time: new Date(Date.now() - 7200000).toISOString(), read: true }
    ]
  };

  const subscribers = {};

  function key(k) {
    return PREFIX + k;
  }

  function get(k) {
    try {
      const raw = localStorage.getItem(key(k));
      if (raw === null) return structuredClone(DEFAULTS[k]);
      return JSON.parse(raw);
    } catch (e) {
      console.warn('[SNS.store] Read error for', k, e);
      return structuredClone(DEFAULTS[k]);
    }
  }

  function set(k, value) {
    try {
      localStorage.setItem(key(k), JSON.stringify(value));
      if (subscribers[k]) {
        subscribers[k].forEach(fn => {
          try { fn(value); } catch (e) {}
        });
      }
    } catch (e) {
      console.warn('[SNS.store] Write error for', k, e);
    }
  }

  function update(k, updater) {
    set(k, updater(get(k)));
  }

  function subscribe(k, fn) {
    if (!subscribers[k]) subscribers[k] = [];
    subscribers[k].push(fn);
    return () => {
      subscribers[k] = subscribers[k].filter(f => f !== fn);
    };
  }

  function clearAll() {
    Object.keys(DEFAULTS).forEach(k => localStorage.removeItem(key(k)));
  }

  // ── Streak Management ──
  function updateStreak() {
    const todayStr = new Date().toISOString().slice(0, 10);
    const streak = get('streak');
    if (streak.lastStudyDate === todayStr) return streak;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().slice(0, 10);

    let newStreak;
    if (streak.lastStudyDate === yStr) {
      newStreak = { ...streak, current: streak.current + 1, lastStudyDate: todayStr };
    } else if (streak.lastStudyDate === '') {
      newStreak = { ...streak, current: 1, lastStudyDate: todayStr };
    } else {
      newStreak = { ...streak, current: 1, lastStudyDate: todayStr };
    }

    newStreak.longest = Math.max(newStreak.longest, newStreak.current);
    set('streak', newStreak);
    return newStreak;
  }

  // ── XP Management ──
  function addXP(amount) {
    update('profile', profile => {
      const newXP = profile.xp + amount;
      const newLevel = Math.floor(newXP / 500) + 1;
      return { ...profile, xp: newXP, level: newLevel };
    });
  }

  // ── Session Tracking ──
  function saveSession(sessionData) {
    const todayStr = new Date().toISOString().slice(0, 10);

    // Update study time
    update('studyTime', time => ({
      ...time,
      [todayStr]: (time[todayStr] || 0) + (sessionData.durationMin || 0)
    }));

    // Add to sessions
    update('studySessions', sessions => {
      const newSession = {
        id: SNS.utils.generateId(),
        date: new Date().toISOString(),
        ...sessionData
      };
      return [newSession, ...sessions].slice(0, 100); // keep last 100
    });

    // Update streak
    updateStreak();

    // Award XP
    const xpGain = (sessionData.durationMin || 0) * 2 + (sessionData.quizScore || 0);
    if (xpGain > 0) addXP(xpGain);

    // Check pomodoro date
    update('pomodoroStats', stats => {
      const newStats = { ...stats };
      if (stats.todayDate !== todayStr) {
        newStats.todaySessions = 0;
        newStats.todayDate = todayStr;
      }
      return newStats;
    });
  }

  // ── Pomodoro completed ──
  function recordPomodoro(type) {
    const todayStr = new Date().toISOString().slice(0, 10);
    update('pomodoroStats', stats => {
      const upd = { ...stats };
      if (type === 'work') {
        upd.totalSessions = (upd.totalSessions || 0) + 1;
        upd.totalMinutes  = (upd.totalMinutes  || 0) + 25;
        if (upd.todayDate !== todayStr) {
          upd.todaySessions = 1;
          upd.todayDate = todayStr;
        } else {
          upd.todaySessions = (upd.todaySessions || 0) + 1;
        }
      }
      return upd;
    });

    if (type === 'work') addXP(50);
  }

  return {
    get,
    set,
    update,
    subscribe,
    clearAll,
    updateStreak,
    addXP,
    saveSession,
    recordPomodoro,
    DEFAULTS
  };

})();
