/* ═══════════════════════════════════════════
   sNibaStudy — Chatbot Knowledge Base
   ═══════════════════════════════════════════ */

window.SNS = window.SNS || {};

SNS.CHATBOT_KB = {

  // ── Generic patterns (always available) ──
  generic: [
    {
      patterns: ["don't understand", "dont understand", "confused", "confusing", "makes no sense", "what does this mean", "i'm lost"],
      response: "No worries! Let me try a different approach. Try clicking **\"Explain like I'm 5\"** for a simpler breakdown. You can also ask me to explain a specific part — just type it!"
    },
    {
      patterns: ["give example", "show example", "example please", "can you give", "illustrate", "for instance"],
      response: "Great idea! Examples make everything clearer. Ask me something like: \"Example of quadratic equation\" or \"Example of Newton's 2nd law\" — I'll show you a concrete step-by-step example."
    },
    {
      patterns: ["simplify", "simpler", "easier", "too hard", "too complex", "make it simple"],
      response: "Let me simplify! The key idea is this: focus on the **core concept** first, ignore the details. Use the **\"Explain like I'm 5\"** button for the simplest version. Which specific part is tricky?"
    },
    {
      patterns: ["explain more", "more detail", "elaborate", "tell me more", "go deeper", "in depth"],
      response: "Sure! Click **\"Explain Deeper\"** for an advanced explanation. Or tell me which specific aspect you want more detail on, and I'll focus on that."
    },
    {
      patterns: ["how to study", "study tips", "how to learn", "study better"],
      response: "Here are proven study tips:\n• 🍅 **Pomodoro technique** — 25 min focus, 5 min break\n• 📝 **Active recall** — test yourself (use flashcards!)\n• 📅 **Spaced repetition** — review at increasing intervals\n• 🤔 **Teach someone** — if you can explain it, you know it\nTry the Study Tools page for a built-in Pomodoro timer!"
    },
    {
      patterns: ["what is this", "what is", "define", "definition", "meaning of"],
      response: "Type the term you want defined! For example: \"What is quadratic equation\" or \"What is mitosis\". I'll search the NIS curriculum for the best explanation."
    },
    {
      patterns: ["help", "i need help", "stuck", "how do i"],
      response: "I'm here to help! 🤝 Try:\n• Typing a **topic or concept** to get an explanation\n• Clicking **Quiz** to test your knowledge\n• Using **Flashcards** for quick review\n• Navigating to **NIS Program** to browse subjects"
    },
    {
      patterns: ["test me", "quiz me", "ask me", "question"],
      response: "Click the **Quiz** tab above to start a quiz on this topic! I've prepared 5 questions for you. After completing it, I'll show you which areas need more work."
    },
    {
      patterns: ["flashcard", "flash card", "flip card", "cards"],
      response: "Click the **Flashcards** tab above! You'll get flip cards for this topic. Mark cards as 'Known' to track your progress, and focus on the difficult ones."
    },
    {
      patterns: ["formula", "equation", "solve", "calculate"],
      response: "For the key formulas on this topic, check the **Flashcards** — they have all the essential formulas organized for quick review. You can also find formulas in the explanation above."
    },
    {
      patterns: ["how long", "how much time", "estimated"],
      response: "Study time varies by topic. A typical session is 25–30 minutes (one Pomodoro). Check the topic card for an estimated time. Focus > speed — better to understand slowly than rush!"
    },
    {
      patterns: ["thanks", "thank you", "great", "awesome", "perfect", "good"],
      response: "You're welcome! 🎉 Keep up the great work! Remember: consistent daily study beats cramming. Check your streak on the Dashboard and keep it going!"
    },
    {
      patterns: ["save", "bookmark", "favorite"],
      response: "Click the **Save Session** button at the top of the study panel to save this session to your library. You can find saved sessions in the **Saved** section."
    },
    {
      patterns: ["friend", "room", "study together", "study with"],
      response: "Head to the **Social** page to see your friends' study progress and join a Study Room! Study rooms have a shared Pomodoro timer and show who's studying with you."
    },
    {
      patterns: ["progress", "score", "performance", "weak"],
      response: "Check the **My Progress** page to see your quiz scores, study heatmap, and weak areas that need attention. The more you study, the more detailed your analytics!"
    },
    {
      patterns: ["hello", "hi", "hey", "greetings"],
      response: "Hi there! 👋 I'm your AI study assistant. Ask me anything about your topics, or type a concept to get an explanation with quizzes and flashcards!"
    }
  ],

  // ── Subject-specific patterns ──
  subjects: {
    math: [
      {
        patterns: ["derivative", "differentiation", "calculus"],
        response: "Derivatives measure the rate of change. For f(x) = xⁿ, the derivative is f'(x) = n·xⁿ⁻¹. This is coming up in higher grades! For now, focus on algebra and trigonometry."
      },
      {
        patterns: ["integral", "integration"],
        response: "Integration is the reverse of differentiation — it finds area under a curve. This is a calculus topic for Grade 11+. Want to explore functions and graphs first?"
      },
      {
        patterns: ["quadratic", "parabola"],
        response: "For quadratic equations, remember:\n• Standard form: ax² + bx + c = 0\n• Formula: x = (-b ± √(b²-4ac)) / 2a\n• Discriminant D = b²-4ac tells you number of roots\nTry the quadratic topic in the NIS Program!"
      },
      {
        patterns: ["sin", "cos", "tan", "trig"],
        response: "Trigonometry shortcut: **SOH-CAH-TOA**\n• Sin = Opposite/Hypotenuse\n• Cos = Adjacent/Hypotenuse\n• Tan = Opposite/Adjacent\nKey angles: 30°, 45°, 60°, 90° — memorize these!"
      }
    ],
    physics: [
      {
        patterns: ["energy", "kinetic", "potential"],
        response: "Types of energy:\n• Kinetic: KE = ½mv² (moving objects)\n• Potential: PE = mgh (height × gravity)\n• Conservation: total energy stays constant in a closed system!"
      },
      {
        patterns: ["electric", "current", "voltage", "resistance", "ohm"],
        response: "Ohm's Law: V = IR (Voltage = Current × Resistance)\n• V in Volts, I in Amperes, R in Ohms\n• Series circuit: R_total = R₁ + R₂ + ...\n• Parallel: 1/R_total = 1/R₁ + 1/R₂ + ..."
      }
    ],
    biology: [
      {
        patterns: ["photosynthesis"],
        response: "Photosynthesis: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂\nPlants use sunlight to convert CO₂ + water into glucose + oxygen.\nHappens in the **chloroplast** (specifically the thylakoids)."
      },
      {
        patterns: ["mitosis", "meiosis", "cell division"],
        response: "**Mitosis**: one cell → 2 identical daughter cells (for growth/repair)\nPhases: Prophase → Metaphase → Anaphase → Telophase (PMAT)\n\n**Meiosis**: one cell → 4 unique cells (for reproduction)\nReduces chromosome number by half."
      },
      {
        patterns: ["dna", "gene", "genetics", "chromosome"],
        response: "DNA is the blueprint of life!\n• DNA → RNA → Protein (central dogma)\n• Genes are segments of DNA that code for proteins\n• Humans have 46 chromosomes (23 pairs)\n• Mutations = changes in DNA sequence"
      }
    ],
    chemistry: [
      {
        patterns: ["mole", "avogadro", "mol"],
        response: "A mole = 6.022 × 10²³ particles (Avogadro's number)\nn = m/M where:\n• n = moles, m = mass (g), M = molar mass (g/mol)\nExample: 18g of water = 1 mole (M of H₂O = 18 g/mol)"
      },
      {
        patterns: ["acid", "base", "ph", "neutral"],
        response: "**pH scale (0-14):**\n• pH < 7 = acidic (HCl, vinegar)\n• pH = 7 = neutral (pure water)\n• pH > 7 = basic/alkaline (NaOH, baking soda)\n\npH = -log[H⁺]\nAcid + Base → Salt + Water (neutralization)"
      }
    ],
    english: [
      {
        patterns: ["essay", "writing", "paragraph", "thesis"],
        response: "Essay structure: **Introduction → Body → Conclusion**\n• Intro: hook + background + thesis statement\n• Body: each paragraph = one idea (topic sentence + evidence + analysis)\n• Conclusion: restate thesis + summary + final thought\nTIP: Plan before you write!"
      },
      {
        patterns: ["ielts", "band", "score", "exam"],
        response: "IELTS tips:\n• **Reading**: Skim first, then scan for answers\n• **Writing**: Task 1 ≥ 150 words, Task 2 ≥ 250 words\n• **Speaking**: Don't memorize! Have natural conversations\n• **Listening**: Read questions BEFORE the audio plays\nCheck the Resources Hub for IELTS.gg!"
      }
    ]
  }

};

// ── Chatbot engine ──
SNS.chatbot = (function () {

  function findResponse(input, subjectId) {
    const text = input.toLowerCase().trim();
    if (!text) return null;

    // Check subject-specific patterns first
    if (subjectId && SNS.CHATBOT_KB.subjects[subjectId]) {
      for (const entry of SNS.CHATBOT_KB.subjects[subjectId]) {
        if (entry.patterns.some(p => text.includes(p))) {
          return entry.response;
        }
      }
    }

    // Check generic patterns
    for (const entry of SNS.CHATBOT_KB.generic) {
      if (entry.patterns.some(p => text.includes(p))) {
        return entry.response;
      }
    }

    // Search curriculum keywords
    const results = SNS.searchTopics(text);
    if (results.length > 0) {
      const best = results[0];
      return `I found "${best.sub.title}" in ${best.subject.label}! 📚\n${best.sub.explanation ? best.sub.explanation.slice(0, 200) + '...' : ''}\n\nType the topic name to load a full study session with explanation, quiz, and flashcards!`;
    }

    // Fallback
    return `I'm not sure about "${SNS.utils.escapeHtml(text.slice(0, 40))}", but here's what I suggest:\n• Search the **NIS Program** for this topic\n• Try the **Resources Hub** for external help\n• Rephrase your question and I'll try again!`;
  }

  function formatResponse(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  return { findResponse, formatResponse };

})();
