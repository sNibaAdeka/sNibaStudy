/* ═══════════════════════════════════════════
   sNibaStudy — External Resources Data
   ═══════════════════════════════════════════ */

window.SNS = window.SNS || {};

SNS.RESOURCES = [
  {
    category: 'ielts',
    categoryLabel: 'IELTS & English',
    categoryIcon: 'fa-language',
    categoryColor: '--purple',
    resources: [
      {
        id: 'r-ielts-gg',
        name: 'IELTS.gg',
        type: 'Practice Platform',
        icon: '🎯',
        iconBg: '#a78bfa20',
        description: 'Free IELTS practice tests, band score calculator, and detailed topic-by-topic preparation guides.',
        url: 'https://ielts.gg',
        tags: ['IELTS', 'Practice', 'Free'],
        featured: true
      },
      {
        id: 'r-bbc-english',
        name: 'BBC Learning English',
        type: 'Learning Platform',
        icon: '📻',
        iconBg: '#a78bfa20',
        description: 'Free English learning resources from the BBC — vocabulary, grammar, news, and pronunciation lessons.',
        url: 'https://www.bbc.co.uk/learningenglish',
        tags: ['Grammar', 'Vocabulary', 'Free']
      },
      {
        id: 'r-cambridge',
        name: 'Cambridge English',
        type: 'Official Resources',
        icon: '🎓',
        iconBg: '#a78bfa20',
        description: 'Official Cambridge materials for IELTS and other English qualifications, including sample tests.',
        url: 'https://www.cambridgeenglish.org',
        tags: ['Official', 'IELTS', 'Exams']
      },
      {
        id: 'r-british-council',
        name: 'British Council',
        type: 'Learning Platform',
        icon: '🌐',
        iconBg: '#a78bfa20',
        description: 'English language learning resources, grammar exercises, and IELTS preparation tips.',
        url: 'https://learnenglish.britishcouncil.org',
        tags: ['Grammar', 'Speaking', 'Free']
      }
    ]
  },
  {
    category: 'it',
    categoryLabel: 'IT & Programming',
    categoryIcon: 'fa-code',
    categoryColor: '--accent',
    resources: [
      {
        id: 'r-github',
        name: 'GitHub',
        type: 'Development Platform',
        icon: '🐙',
        iconBg: '#00d4aa20',
        description: 'The world\'s leading platform for hosting and collaborating on code. Essential for every programmer.',
        url: 'https://github.com',
        tags: ['Git', 'Collaboration', 'Open Source'],
        featured: true
      },
      {
        id: 'r-freecodecamp',
        name: 'freeCodeCamp',
        type: 'Learning Platform',
        icon: '🔥',
        iconBg: '#00d4aa20',
        description: 'Free, comprehensive web development curriculum with certifications in HTML, CSS, JavaScript, Python, and more.',
        url: 'https://www.freecodecamp.org',
        tags: ['Free', 'Web Dev', 'Certificate']
      },
      {
        id: 'r-mdn',
        name: 'MDN Web Docs',
        type: 'Reference',
        icon: '📖',
        iconBg: '#00d4aa20',
        description: 'The definitive reference for HTML, CSS, and JavaScript by Mozilla. Best documentation for web development.',
        url: 'https://developer.mozilla.org',
        tags: ['Reference', 'HTML', 'CSS', 'JavaScript']
      },
      {
        id: 'r-cs50',
        name: 'Harvard CS50',
        type: 'Online Course',
        icon: '🏛️',
        iconBg: '#00d4aa20',
        description: 'Harvard\'s iconic Introduction to Computer Science course — free on edX. Best starting point for CS.',
        url: 'https://cs50.harvard.edu',
        tags: ['Computer Science', 'Free', 'Beginner']
      }
    ]
  },
  {
    category: 'kz-edu',
    categoryLabel: 'NIS / Kazakhstan Education',
    categoryIcon: 'fa-star-and-crescent',
    categoryColor: '--yellow',
    resources: [
      {
        id: 'r-beyim',
        name: 'Beyim.ai',
        type: 'AI Learning Platform',
        icon: '🇰🇿',
        iconBg: '#fbbf2420',
        description: 'AI-powered personalized learning platform for Kazakhstani students. Adaptive exercises and curriculum-aligned content.',
        url: 'https://beyim.ai',
        tags: ['Kazakhstan', 'AI', 'Personalized'],
        featured: true
      },
      {
        id: 'r-nis-portal',
        name: 'NIS Student Portal',
        type: 'School Platform',
        icon: '🏫',
        iconBg: '#fbbf2420',
        description: 'Official Nazarbayev Intellectual Schools student portal for assignments, schedules, and resources.',
        url: 'https://nis.edu.kz',
        tags: ['NIS', 'Official', 'School']
      },
      {
        id: 'r-olimp-kz',
        name: 'Bilim Land',
        type: 'Education Platform',
        icon: '🏆',
        iconBg: '#fbbf2420',
        description: 'Kazakhstan\'s leading digital education platform with subjects aligned to the national curriculum.',
        url: 'https://bilimland.kz',
        tags: ['Kazakhstan', 'Curriculum', 'Videos']
      },
      {
        id: 'r-testkz',
        name: 'UBT Practice Tests',
        type: 'Exam Preparation',
        icon: '📝',
        iconBg: '#fbbf2420',
        description: 'Practice tests and resources for the Unified National Testing (UBT/ЕНТ) examinations in Kazakhstan.',
        url: 'https://ubt.kz',
        tags: ['UBT', 'Exam Prep', 'Kazakhstan']
      }
    ]
  },
  {
    category: 'general',
    categoryLabel: 'General Learning',
    categoryIcon: 'fa-book',
    categoryColor: '--blue',
    resources: [
      {
        id: 'r-khan',
        name: 'Khan Academy',
        type: 'Learning Platform',
        icon: '🌿',
        iconBg: '#60a5fa20',
        description: 'Free world-class education for anyone, anywhere. Math, science, arts, and humanities — all free.',
        url: 'https://www.khanacademy.org',
        tags: ['Free', 'Math', 'Science', 'All subjects'],
        featured: true
      },
      {
        id: 'r-coursera',
        name: 'Coursera',
        type: 'Online Courses',
        icon: '🎓',
        iconBg: '#60a5fa20',
        description: 'University-level courses from top institutions worldwide. Certificates and degrees available.',
        url: 'https://www.coursera.org',
        tags: ['University', 'Certificate', 'Professional']
      },
      {
        id: 'r-3blue1brown',
        name: '3Blue1Brown',
        type: 'YouTube Channel',
        icon: '🔵',
        iconBg: '#60a5fa20',
        description: 'Beautiful animated math explanations on YouTube. Makes complex topics like calculus and linear algebra intuitive.',
        url: 'https://www.youtube.com/@3blue1brown',
        tags: ['Math', 'YouTube', 'Visual']
      },
      {
        id: 'r-wolframalpha',
        name: 'Wolfram Alpha',
        type: 'Computational Tool',
        icon: '🧮',
        iconBg: '#60a5fa20',
        description: 'Computational knowledge engine — solve equations, explore data, and get step-by-step math solutions.',
        url: 'https://www.wolframalpha.com',
        tags: ['Math', 'Solver', 'Science']
      }
    ]
  }
];
