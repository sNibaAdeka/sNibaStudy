/* ═══════════════════════════════════════════
   sNibaStudy — NIS Curriculum Mock Data
   ═══════════════════════════════════════════ */

window.SNS = window.SNS || {};

SNS.CURRICULUM = {

  math: {
    id: 'math',
    label: 'Mathematics',
    icon: 'fa-square-root-variable',
    colorVar: '--blue',
    color: '#60a5fa',
    grade: 'Grade 10',
    topics: [
      {
        id: 'math-algebra',
        title: 'Algebra',
        subtopics: [
          {
            id: 'math-quadratic',
            title: 'Quadratic Equations',
            difficulty: 'medium',
            estimatedMin: 30,
            keywords: ['quadratic', 'equation', 'parabola', 'discriminant', 'roots', 'factoring', 'formula', 'ax2', 'vertex'],
            explanation: `A quadratic equation has the standard form: ax² + bx + c = 0, where a ≠ 0.

**Three solving methods:**

1. **Factoring** — Rewrite as (x + p)(x + q) = 0
   Example: x² - 5x + 6 = (x-2)(x-3) = 0 → x = 2 or x = 3

2. **Quadratic Formula** — Always works:
   x = (-b ± √(b² - 4ac)) / 2a

3. **Completing the Square** — Rewrite as (x + h)² = k

**The Discriminant D = b² - 4ac tells you:**
• D > 0 → two distinct real roots
• D = 0 → one repeated real root
• D < 0 → no real roots (complex)

**Example:** Solve 2x² - 4x - 6 = 0
Using formula: x = (4 ± √(16 + 48)) / 4 = (4 ± 8) / 4
x = 3 or x = -1`,
            simpleExplanation: `Imagine a ball thrown in the air. Its path makes a U-shape — that's a parabola, described by a quadratic equation ax² + bx + c = 0.

To find where the ball lands (roots), use the magic formula:
x = (-b ± √(b² - 4ac)) / 2a

Think of it as: x = (-b plus-or-minus square root of (b²-4ac)) divided by (2a)

If the number under the square root is negative, there are no real answers — the ball never hits the ground in our world!`,
            deepExplanation: `Quadratic equations model parabolic motion, optimization problems, and appear in physics, engineering, and economics.

**Vertex Form:** y = a(x-h)² + k, where (h,k) is the vertex
Converting: h = -b/2a, k = c - b²/4a

**Vieta's Formulas** (sum and product of roots):
If x₁, x₂ are roots: x₁ + x₂ = -b/a and x₁ · x₂ = c/a

**Graphical Analysis:**
• If a > 0: parabola opens upward (minimum at vertex)
• If a < 0: parabola opens downward (maximum at vertex)
• The axis of symmetry: x = -b/2a

**Complex roots:** When D < 0, roots are x = (-b ± i√|D|) / 2a
These are conjugate complex numbers a ± bi.`,
            quiz: [
              {
                q: 'What is the discriminant of x² - 5x + 6 = 0?',
                options: ['1', '4', '25', '-1'],
                correct: 0,
                explanation: 'D = b² - 4ac = (-5)² - 4(1)(6) = 25 - 24 = 1'
              },
              {
                q: 'How many real roots does x² + 4 = 0 have?',
                options: ['0', '1', '2', 'Infinite'],
                correct: 0,
                explanation: 'D = 0 - 4(1)(4) = -16 < 0, so no real roots.'
              },
              {
                q: 'What are the roots of x² - 4 = 0?',
                options: ['x = ±2', 'x = ±4', 'x = 2 only', 'x = 0'],
                correct: 0,
                explanation: 'x² = 4 → x = ±√4 = ±2'
              },
              {
                q: 'For 2x² - 3x - 2 = 0, what is the product of the roots?',
                options: ['-1', '1', '-3/2', '3/2'],
                correct: 0,
                explanation: 'By Vieta\'s: x₁·x₂ = c/a = -2/2 = -1'
              },
              {
                q: 'Which method always works to solve a quadratic?',
                options: ['Quadratic formula', 'Factoring', 'Completing the square only', 'Graphing'],
                correct: 0,
                explanation: 'The quadratic formula x = (-b ± √(b²-4ac))/2a always works for any quadratic.'
              }
            ],
            flashcards: [
              { front: 'Quadratic Formula', back: 'x = (-b ± √(b² - 4ac)) / 2a' },
              { front: 'Discriminant', back: 'D = b² - 4ac\nD > 0: two roots\nD = 0: one root\nD < 0: no real roots' },
              { front: 'Vertex of parabola', back: 'x = -b/2a\ny = c - b²/4a' },
              { front: 'Sum of roots (Vieta)', back: 'x₁ + x₂ = -b/a' },
              { front: 'Product of roots (Vieta)', back: 'x₁ · x₂ = c/a' },
              { front: 'Standard form', back: 'ax² + bx + c = 0, where a ≠ 0' }
            ]
          },
          {
            id: 'math-functions',
            title: 'Functions & Graphs',
            difficulty: 'medium',
            estimatedMin: 25,
            keywords: ['function', 'domain', 'range', 'graph', 'linear', 'slope', 'intercept', 'mapping'],
            explanation: `A function f maps each input x to exactly one output f(x).

**Key concepts:**
• Domain — set of valid inputs
• Range — set of possible outputs
• f(x) notation — "f of x"

**Linear function:** f(x) = mx + b
• m = slope (rise/run)
• b = y-intercept

**Slope formula:** m = (y₂ - y₁)/(x₂ - x₁)

**Types of functions:**
• Constant: f(x) = c
• Linear: f(x) = mx + b
• Quadratic: f(x) = ax² + bx + c
• Absolute value: f(x) = |x|`,
            simpleExplanation: `A function is like a machine: you put something in, you get something out. Every input gives exactly ONE output.

Think of a vending machine: press B3, you always get the same snack. That's a function!

f(x) = 2x means "multiply the input by 2". So f(3) = 6, f(5) = 10.`,
            deepExplanation: `Functions are fundamental to all of mathematics. Advanced topics include:

**Composition:** (f∘g)(x) = f(g(x))
**Inverse functions:** f⁻¹ such that f(f⁻¹(x)) = x
**Even/Odd functions:**
  Even: f(-x) = f(x) (symmetric about y-axis)
  Odd: f(-x) = -f(x) (symmetric about origin)

**Piecewise functions:** Different rules for different domains.`,
            quiz: [
              { q: 'What is the slope of y = 3x - 7?', options: ['3', '-7', '7', '-3'], correct: 0, explanation: 'In y = mx + b, m = 3 is the slope.' },
              { q: 'For f(x) = x² - 1, what is f(3)?', options: ['8', '9', '7', '10'], correct: 0, explanation: 'f(3) = 3² - 1 = 9 - 1 = 8' },
              { q: 'What is the y-intercept of y = 2x + 5?', options: ['5', '2', '-5', '0'], correct: 0, explanation: 'The y-intercept is b = 5 in y = mx + b.' },
              { q: 'Which is NOT a function?', options: ['x² + y² = 4 (full circle)', 'y = x²', 'y = 3x', 'y = |x|'], correct: 0, explanation: 'A full circle fails the vertical line test — two y-values for one x.' },
              { q: 'If f(x) = 2x + 1, what is f(f(2))?', options: ['11', '5', '9', '10'], correct: 0, explanation: 'f(2) = 5, then f(5) = 2(5)+1 = 11' }
            ],
            flashcards: [
              { front: 'Domain', back: 'The set of all valid input values (x-values) of a function' },
              { front: 'Range', back: 'The set of all possible output values (y-values) of a function' },
              { front: 'Slope formula', back: 'm = (y₂ - y₁) / (x₂ - x₁)' },
              { front: 'Linear function', back: 'f(x) = mx + b\nm = slope, b = y-intercept' },
              { front: 'Vertical line test', back: 'A graph is a function if every vertical line touches it at most once' },
              { front: 'Composition (f∘g)(x)', back: 'Apply g first, then f: f(g(x))' }
            ]
          }
        ]
      },
      {
        id: 'math-trigonometry',
        title: 'Trigonometry',
        subtopics: [
          {
            id: 'math-trig-basic',
            title: 'Basic Trigonometric Ratios',
            difficulty: 'medium',
            estimatedMin: 35,
            keywords: ['sine', 'cosine', 'tangent', 'sin', 'cos', 'tan', 'triangle', 'angle', 'hypotenuse', 'sohcahtoa'],
            explanation: `Trigonometry studies relationships between angles and sides in triangles.

**SOH-CAH-TOA (for right triangles):**
• sin(θ) = Opposite / Hypotenuse
• cos(θ) = Adjacent / Hypotenuse
• tan(θ) = Opposite / Adjacent

**Key angles:**
| Angle | sin  | cos  | tan  |
|-------|------|------|------|
| 0°    | 0    | 1    | 0    |
| 30°   | 1/2  | √3/2 | 1/√3 |
| 45°   | √2/2 | √2/2 | 1    |
| 60°   | √3/2 | 1/2  | √3   |
| 90°   | 1    | 0    | ∞    |

**Pythagorean identity:** sin²(θ) + cos²(θ) = 1`,
            simpleExplanation: `SOHCAHTOA! Remember it like a magic spell:
• SOH: Sine = Opposite/Hypotenuse
• CAH: Cosine = Adjacent/Hypotenuse
• TOA: Tangent = Opposite/Adjacent

The hypotenuse is always the longest side — opposite the right angle.`,
            deepExplanation: `Beyond right triangles, trig extends to the unit circle and all angles.

**Unit circle:** radius 1, centered at origin
Point (cos θ, sin θ) for angle θ from positive x-axis.

**Reciprocal functions:**
• csc(θ) = 1/sin(θ)
• sec(θ) = 1/cos(θ)
• cot(θ) = 1/tan(θ)

**Law of Sines:** a/sin(A) = b/sin(B) = c/sin(C)
**Law of Cosines:** c² = a² + b² - 2ab·cos(C)`,
            quiz: [
              { q: 'In a right triangle with opposite=3, hypotenuse=5, what is sin(θ)?', options: ['3/5', '4/5', '3/4', '5/3'], correct: 0, explanation: 'sin = Opposite/Hypotenuse = 3/5 = 0.6' },
              { q: 'What is cos(60°)?', options: ['1/2', '√3/2', '√2/2', '1'], correct: 0, explanation: 'cos(60°) = 1/2 = 0.5 — memorize the key angles!' },
              { q: 'sin²(θ) + cos²(θ) = ?', options: ['1', '0', '2', 'tan²(θ)'], correct: 0, explanation: 'This is the Pythagorean identity — always equals 1.' },
              { q: 'tan(45°) = ?', options: ['1', '√2', '1/2', '0'], correct: 0, explanation: 'tan(45°) = sin/cos = (√2/2)/(√2/2) = 1' },
              { q: 'What is sin(90°)?', options: ['1', '0', '1/2', '√2/2'], correct: 0, explanation: 'sin(90°) = 1. At 90°, opposite = hypotenuse.' }
            ],
            flashcards: [
              { front: 'SOH', back: 'Sine = Opposite / Hypotenuse' },
              { front: 'CAH', back: 'Cosine = Adjacent / Hypotenuse' },
              { front: 'TOA', back: 'Tangent = Opposite / Adjacent' },
              { front: 'Pythagorean identity', back: 'sin²(θ) + cos²(θ) = 1' },
              { front: 'sin(30°)', back: '1/2' },
              { front: 'cos(60°)', back: '1/2' }
            ]
          }
        ]
      },
      {
        id: 'math-geometry',
        title: 'Geometry',
        subtopics: [
          {
            id: 'math-circles',
            title: 'Circle Geometry',
            difficulty: 'medium',
            estimatedMin: 25,
            keywords: ['circle', 'radius', 'diameter', 'circumference', 'area', 'chord', 'arc', 'sector', 'pi'],
            explanation: `A circle is the set of all points equidistant from a center.

**Key formulas:**
• Circumference: C = 2πr = πd
• Area: A = πr²
• Arc length: s = rθ (θ in radians)
• Sector area: A = ½r²θ

**Key terms:**
• Radius (r) — center to edge
• Diameter (d = 2r) — across the circle
• Chord — line segment connecting two points on the circle
• Tangent — line touching circle at exactly one point`,
            simpleExplanation: `A circle is perfectly round. Pi (π ≈ 3.14) is the special number that connects diameter to circumference.

Two formulas to know:
• Area = π × r² (how much space inside)
• Circumference = 2 × π × r (how far around the edge)`,
            deepExplanation: `Advanced circle theorems:
• Inscribed angle = half central angle
• Tangent-radius are perpendicular
• Power of a point: PA × PB = PC × PD (for chords through P)
• Circle equation: (x-h)² + (y-k)² = r²`,
            quiz: [
              { q: 'What is the area of a circle with radius 5?', options: ['25π', '10π', '5π', '50π'], correct: 0, explanation: 'A = πr² = π(5²) = 25π' },
              { q: 'What is the circumference of a circle with diameter 8?', options: ['8π', '4π', '16π', '64π'], correct: 0, explanation: 'C = πd = 8π' },
              { q: 'How many degrees are in a full circle?', options: ['360°', '180°', '270°', '90°'], correct: 0, explanation: 'A full rotation is always 360°' },
              { q: 'A tangent to a circle is...?', options: ['Perpendicular to the radius at contact', 'Parallel to the radius', 'A chord that passes through center', 'None of these'], correct: 0, explanation: 'A tangent always meets the radius at 90°.' },
              { q: 'If radius = 7, what is the diameter?', options: ['14', '7', '49', '3.5'], correct: 0, explanation: 'd = 2r = 2 × 7 = 14' }
            ],
            flashcards: [
              { front: 'Circle area', back: 'A = πr²' },
              { front: 'Circumference', back: 'C = 2πr = πd' },
              { front: 'Arc length', back: 's = rθ (θ in radians)' },
              { front: 'Sector area', back: 'A = ½r²θ' },
              { front: 'π (pi)', back: '≈ 3.14159... ratio of circumference to diameter' },
              { front: 'Tangent line property', back: 'Perpendicular to the radius at the point of tangency' }
            ]
          }
        ]
      },
      {
        id: 'math-statistics',
        title: 'Statistics & Probability',
        subtopics: [
          {
            id: 'math-stats-basic',
            title: 'Descriptive Statistics',
            difficulty: 'easy',
            estimatedMin: 20,
            keywords: ['mean', 'median', 'mode', 'range', 'average', 'statistics', 'data', 'standard deviation', 'variance'],
            explanation: `Descriptive statistics summarize and describe data.

**Measures of central tendency:**
• Mean (average): sum ÷ count
• Median: middle value when sorted
• Mode: most frequent value

**Measures of spread:**
• Range: max - min
• Variance: average of squared deviations from mean
• Standard deviation: √variance (σ)

**Example data set:** {2, 4, 4, 6, 8, 8, 8, 10}
• Mean = (2+4+4+6+8+8+8+10)/8 = 50/8 = 6.25
• Median = (6+8)/2 = 7 (middle two values)
• Mode = 8 (appears 3 times)`,
            simpleExplanation: `Statistics help us understand data by finding the "center" and "spread":

• Mean = average (add everything, divide by count)
• Median = the middle number (sort them first!)
• Mode = the number that appears most often

For {1, 2, 2, 3, 4}: mean=2.4, median=2, mode=2`,
            deepExplanation: `Beyond basic statistics: box plots, z-scores, normal distribution.

**Z-score:** z = (x - μ) / σ — how many standard deviations from mean
**Normal distribution:** 68-95-99.7 rule (1σ, 2σ, 3σ covers those percentages)
**Correlation coefficient r:** -1 to 1, measures linear relationship strength`,
            quiz: [
              { q: 'Find the mean of {4, 7, 7, 10}', options: ['7', '8', '7.5', '6.5'], correct: 0, explanation: 'Mean = (4+7+7+10)/4 = 28/4 = 7' },
              { q: 'Find the median of {3, 7, 1, 9, 5}', options: ['5', '7', '3', '9'], correct: 0, explanation: 'Sorted: {1,3,5,7,9}. Middle value = 5.' },
              { q: 'For {2, 4, 4, 6, 8}, what is the mode?', options: ['4', '2', '6', '8'], correct: 0, explanation: '4 appears twice — more than any other value.' },
              { q: 'Range of {12, 5, 8, 20, 3} = ?', options: ['17', '20', '15', '10'], correct: 0, explanation: 'Range = max - min = 20 - 3 = 17' },
              { q: 'Which measure is MOST affected by outliers?', options: ['Mean', 'Median', 'Mode', 'Range'], correct: 0, explanation: 'The mean is pulled strongly by extreme values (outliers).' }
            ],
            flashcards: [
              { front: 'Mean', back: 'Sum of all values ÷ number of values' },
              { front: 'Median', back: 'Middle value when data is sorted in order' },
              { front: 'Mode', back: 'The value that appears most frequently' },
              { front: 'Range', back: 'Maximum value − Minimum value' },
              { front: 'Standard deviation', back: 'Measures how spread out data is from the mean' },
              { front: 'Outlier', back: 'A data point far from the rest of the data' }
            ]
          }
        ]
      },
      {
        id: 'math-sequences',
        title: 'Sequences & Series',
        subtopics: [
          {
            id: 'math-arithmetic',
            title: 'Arithmetic Sequences',
            difficulty: 'easy',
            estimatedMin: 20,
            keywords: ['arithmetic', 'sequence', 'series', 'common difference', 'sum', 'nth term', 'progression'],
            explanation: `An arithmetic sequence has a constant difference (d) between terms.

**nth term formula:** aₙ = a₁ + (n-1)d

**Sum of first n terms:** Sₙ = n/2 × (a₁ + aₙ) = n/2 × (2a₁ + (n-1)d)

**Example:** 3, 7, 11, 15, ...
• a₁ = 3, d = 4
• a₁₀ = 3 + (10-1)×4 = 3 + 36 = 39
• S₁₀ = 10/2 × (3 + 39) = 5 × 42 = 210`,
            simpleExplanation: `An arithmetic sequence adds the same number each time.
Like: 2, 5, 8, 11, 14... (add 3 each time)

To find the nth term: first term + (n-1) × common difference`,
            deepExplanation: `Arithmetic sequences are special cases of linear functions.
Geometric sequences multiply by a constant ratio r.
aₙ = a₁ × rⁿ⁻¹, Sum = a₁(1-rⁿ)/(1-r)`,
            quiz: [
              { q: 'Find d for: 5, 9, 13, 17, ...', options: ['4', '5', '3', '9'], correct: 0, explanation: 'd = 9-5 = 13-9 = 4. Constant difference.' },
              { q: 'What is the 5th term of 2, 5, 8, 11, ...?', options: ['14', '13', '17', '15'], correct: 0, explanation: 'a₅ = 2 + (5-1)×3 = 2+12 = 14' },
              { q: 'Sum of first 100 natural numbers?', options: ['5050', '4950', '5100', '4900'], correct: 0, explanation: 'S = n(n+1)/2 = 100×101/2 = 5050' },
              { q: 'For 10, 7, 4, 1, ... what is d?', options: ['-3', '3', '-7', '7'], correct: 0, explanation: 'd = 7-10 = 4-7 = -3. Decreasing sequence.' },
              { q: 'a₁=3, d=2. Find a₈.', options: ['17', '19', '15', '21'], correct: 0, explanation: 'a₈ = 3 + 7×2 = 3 + 14 = 17' }
            ],
            flashcards: [
              { front: 'Arithmetic sequence nth term', back: 'aₙ = a₁ + (n-1)d' },
              { front: 'Sum of arithmetic series', back: 'Sₙ = n/2 × (a₁ + aₙ)' },
              { front: 'Common difference (d)', back: 'd = aₙ₊₁ - aₙ (constant for all n)' },
              { front: 'Sum of 1 to n', back: 'n(n+1)/2' },
              { front: 'Geometric sequence nth term', back: 'aₙ = a₁ × rⁿ⁻¹' },
              { front: 'Geometric series sum', back: 'Sₙ = a₁(1-rⁿ)/(1-r)' }
            ]
          }
        ]
      }
    ]
  },

  physics: {
    id: 'physics',
    label: 'Physics',
    icon: 'fa-atom',
    colorVar: '--accent',
    color: '#00d4aa',
    grade: 'Grade 10',
    topics: [
      {
        id: 'phys-mechanics',
        title: 'Classical Mechanics',
        subtopics: [
          {
            id: 'phys-newton',
            title: "Newton's Laws of Motion",
            difficulty: 'medium',
            estimatedMin: 30,
            keywords: ['newton', 'force', 'motion', 'acceleration', 'inertia', 'velocity', 'mass', 'laws', 'action reaction'],
            explanation: `Newton's Three Laws of Motion form the foundation of classical mechanics.

**1st Law (Law of Inertia):**
An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.

**2nd Law (F = ma):**
The acceleration of an object is directly proportional to the net force and inversely proportional to mass.
F = ma (Force = mass × acceleration)
Units: Newtons (N) = kg·m/s²

**3rd Law (Action-Reaction):**
For every action, there is an equal and opposite reaction.
If A exerts force on B, then B exerts equal force on A in the opposite direction.

**Weight vs Mass:**
Weight = mg (m = mass, g = 9.8 m/s² on Earth)`,
            simpleExplanation: `Newton had 3 big ideas about how things move:

1. **Lazy objects stay lazy** — things don't move unless pushed, things moving don't stop unless stopped.
2. **Push harder = go faster** — F = ma (force = mass × acceleration)
3. **Every push has a push back** — punch a wall, the wall punches back!`,
            deepExplanation: `Newton's laws break down at very high speeds (special relativity) and very small scales (quantum mechanics).

**Impulse-Momentum theorem:** J = Δp = F·Δt
**Work-Energy theorem:** W = ΔKE = F·d·cos(θ)
**Conservation of momentum:** p_total = constant (closed system)

Free body diagrams are essential for solving Newton's law problems — draw all forces acting on the object.`,
            quiz: [
              { q: 'F = 20N, m = 4kg. What is a?', options: ['5 m/s²', '4 m/s²', '80 m/s²', '0.2 m/s²'], correct: 0, explanation: 'a = F/m = 20/4 = 5 m/s²' },
              { q: 'What does Newton\'s 1st law describe?', options: ['Inertia', 'F=ma', 'Action-reaction', 'Gravity'], correct: 0, explanation: 'The 1st law is about inertia — objects resist changes to their motion.' },
              { q: 'What is the weight of a 10kg object on Earth? (g=10)', options: ['100 N', '10 N', '1 N', '9.8 N'], correct: 0, explanation: 'W = mg = 10 × 10 = 100 N' },
              { q: 'According to 3rd law, if you push a wall with 50N, the wall pushes you with:', options: ['50 N', '25 N', '100 N', '0 N'], correct: 0, explanation: 'Equal and opposite reaction: exactly 50 N back.' },
              { q: 'A 2kg ball accelerates at 3 m/s². Net force = ?', options: ['6 N', '1.5 N', '5 N', '9 N'], correct: 0, explanation: 'F = ma = 2 × 3 = 6 N' }
            ],
            flashcards: [
              { front: "Newton's 1st Law", back: 'Objects stay at rest or in motion unless acted on by net force (Inertia)' },
              { front: "Newton's 2nd Law", back: 'F = ma\nForce = mass × acceleration' },
              { front: "Newton's 3rd Law", back: 'Every action has an equal and opposite reaction' },
              { front: 'Weight formula', back: 'W = mg (g ≈ 9.8 m/s² on Earth)' },
              { front: 'Net Force', back: 'Vector sum of all forces acting on an object' },
              { front: 'Inertia', back: 'Resistance of an object to change in its state of motion' }
            ]
          },
          {
            id: 'phys-kinematics',
            title: 'Kinematics',
            difficulty: 'medium',
            estimatedMin: 35,
            keywords: ['kinematics', 'velocity', 'acceleration', 'displacement', 'speed', 'SUVAT', 'projectile', 'distance', 'time'],
            explanation: `Kinematics studies motion without considering forces.

**SUVAT Variables:**
• s = displacement (m)
• u = initial velocity (m/s)
• v = final velocity (m/s)
• a = acceleration (m/s²)
• t = time (s)

**4 SUVAT equations:**
1. v = u + at
2. s = ut + ½at²
3. v² = u² + 2as
4. s = ½(u + v)t

**Free fall:** a = g = 9.8 m/s² downward
**Projectile motion:** horizontal (constant v) + vertical (free fall)`,
            simpleExplanation: `Kinematics = describing motion with numbers.

Remember SUVAT: Speed/displacement/acceleration/time formulas.
The most useful: v = u + at (speed changes by acceleration × time)`,
            deepExplanation: `Kinematics in 2D uses vector components.
vₓ = v·cos(θ), vᵧ = v·sin(θ)
For projectile: range = v²·sin(2θ)/g`,
            quiz: [
              { q: 'u=0, a=5 m/s², t=4s. Find v.', options: ['20 m/s', '25 m/s', '10 m/s', '4 m/s'], correct: 0, explanation: 'v = u + at = 0 + 5×4 = 20 m/s' },
              { q: 'u=10, a=2, t=3. Find s.', options: ['39 m', '30 m', '21 m', '40 m'], correct: 0, explanation: 's = ut + ½at² = 10(3) + ½(2)(9) = 30 + 9 = 39 m' },
              { q: 'v²=u²+2as: u=0,a=10,s=5. v=?', options: ['10 m/s', '100 m/s', '50 m/s', '5 m/s'], correct: 0, explanation: 'v² = 0 + 2(10)(5) = 100 → v = 10 m/s' },
              { q: 'Free fall acceleration on Earth ≈ ?', options: ['9.8 m/s²', '10 m/s', '9.8 m/s', '10 m/s²'], correct: 0, explanation: 'g = 9.8 m/s² (or 10 m/s² for quick calculations)' },
              { q: 'A ball is thrown up at 20 m/s. How long to reach max height? (g=10)', options: ['2 s', '4 s', '1 s', '20 s'], correct: 0, explanation: 'At max height, v=0. t = (v-u)/a = (0-20)/(-10) = 2s' }
            ],
            flashcards: [
              { front: 'v = u + at', back: 'Final velocity = initial + acceleration × time' },
              { front: 's = ut + ½at²', back: 'Displacement = initial velocity × time + half × acceleration × time²' },
              { front: 'v² = u² + 2as', back: 'Useful when time is not given' },
              { front: 'Free fall g', back: 'g = 9.8 m/s² ≈ 10 m/s² downward' },
              { front: 'Speed vs Velocity', back: 'Speed = scalar (magnitude only)\nVelocity = vector (magnitude + direction)' },
              { front: 'Projectile motion', back: 'Horizontal: constant velocity\nVertical: free fall (g downward)' }
            ]
          }
        ]
      },
      { id: 'phys-electricity', title: 'Electricity & Magnetism', subtopics: [] },
      { id: 'phys-waves',       title: 'Waves & Optics',          subtopics: [] },
      { id: 'phys-thermo',      title: 'Thermodynamics',          subtopics: [] },
      { id: 'phys-modern',      title: 'Modern Physics',          subtopics: [] }
    ]
  },

  biology: {
    id: 'biology',
    label: 'Biology',
    icon: 'fa-dna',
    colorVar: '--green',
    color: '#4ade80',
    grade: 'Grade 10',
    topics: [
      {
        id: 'bio-cell',
        title: 'Cell Biology',
        subtopics: [
          {
            id: 'bio-cell-structure',
            title: 'Cell Structure & Organelles',
            difficulty: 'easy',
            estimatedMin: 25,
            keywords: ['cell', 'organelle', 'nucleus', 'mitochondria', 'membrane', 'ribosome', 'eukaryote', 'prokaryote', 'cytoplasm'],
            explanation: `Cells are the basic units of life.

**Two main cell types:**
• Prokaryotic — no nucleus (bacteria, archaea)
• Eukaryotic — membrane-bound nucleus (animals, plants, fungi)

**Key organelles:**
• Nucleus — "control center", contains DNA
• Mitochondria — "powerhouse", produces ATP (energy)
• Ribosome — makes proteins
• Endoplasmic Reticulum (ER) — transport network
• Golgi apparatus — packages and ships proteins
• Lysosome — digests waste
• Cell membrane — controls what enters/exits
• Cell wall (plants) — rigid outer layer (cellulose)
• Chloroplast (plants) — photosynthesis`,
            simpleExplanation: `A cell is like a tiny city:
• Nucleus = city hall (headquarters, makes decisions)
• Mitochondria = power plants (makes energy)
• Ribosomes = factories (makes proteins)
• Cell membrane = city border (controls what comes in/out)`,
            deepExplanation: `Cell theory: all organisms are made of cells; cell is basic unit; all cells come from pre-existing cells.

Fluid mosaic model of membrane: phospholipid bilayer with embedded proteins.
Active transport requires ATP; passive transport doesn't.
Osmosis: water moves from low to high solute concentration.`,
            quiz: [
              { q: 'Which organelle is called the "powerhouse of the cell"?', options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Golgi'], correct: 0, explanation: 'Mitochondria produce ATP through cellular respiration.' },
              { q: 'What does the nucleus contain?', options: ['DNA', 'ATP', 'Chlorophyll', 'Protein only'], correct: 0, explanation: 'The nucleus houses the cell\'s DNA (genetic information).' },
              { q: 'Which is unique to plant cells?', options: ['Chloroplast', 'Mitochondria', 'Ribosome', 'Cell membrane'], correct: 0, explanation: 'Chloroplasts perform photosynthesis — found only in plant cells.' },
              { q: 'Prokaryotic cells differ from eukaryotic by:', options: ['No membrane-bound nucleus', 'Having no DNA', 'Being larger', 'Having more organelles'], correct: 0, explanation: 'Prokaryotes lack a true nucleus — DNA floats in the cytoplasm.' },
              { q: 'Where are proteins synthesized?', options: ['Ribosomes', 'Mitochondria', 'Nucleus', 'Vacuole'], correct: 0, explanation: 'Ribosomes read mRNA and assemble amino acids into proteins.' }
            ],
            flashcards: [
              { front: 'Mitochondria', back: 'Powerhouse of the cell — produces ATP through cellular respiration' },
              { front: 'Nucleus', back: 'Control center — contains DNA and directs cell activities' },
              { front: 'Ribosome', back: 'Site of protein synthesis — reads mRNA to make proteins' },
              { front: 'Cell membrane', back: 'Selectively permeable barrier controlling what enters and exits' },
              { front: 'Chloroplast', back: 'Found in plant cells — site of photosynthesis' },
              { front: 'Prokaryote vs Eukaryote', back: 'Prokaryote: no nucleus\nEukaryote: membrane-bound nucleus' }
            ]
          }
        ]
      },
      { id: 'bio-genetics',  title: 'Genetics & Heredity',  subtopics: [] },
      { id: 'bio-evolution', title: 'Evolution',            subtopics: [] },
      { id: 'bio-ecology',   title: 'Ecology & Ecosystems', subtopics: [] },
      { id: 'bio-human',     title: 'Human Body Systems',   subtopics: [] }
    ]
  },

  chemistry: {
    id: 'chemistry',
    label: 'Chemistry',
    icon: 'fa-flask',
    colorVar: '--orange',
    color: '#fb923c',
    grade: 'Grade 10',
    topics: [
      {
        id: 'chem-periodic',
        title: 'Periodic Table & Trends',
        subtopics: [
          {
            id: 'chem-periodic-table',
            title: 'Periodic Table Structure',
            difficulty: 'easy',
            estimatedMin: 20,
            keywords: ['periodic table', 'element', 'period', 'group', 'metal', 'nonmetal', 'atomic number', 'atomic mass', 'proton', 'electron', 'neutron'],
            explanation: `The periodic table organizes all known elements by atomic number.

**Structure:**
• 118 elements, 7 periods (rows), 18 groups (columns)
• Periods: elements in same row have same number of electron shells
• Groups: elements in same column have similar properties

**Main regions:**
• Metals (left + center) — conduct electricity, malleable, shiny
• Non-metals (right) — poor conductors, brittle
• Metalloids (staircase boundary) — semiconductor properties

**Key groups:**
• Group 1 (Alkali metals): Li, Na, K — very reactive
• Group 2 (Alkaline earth): Be, Mg, Ca
• Group 17 (Halogens): F, Cl, Br, I — reactive non-metals
• Group 18 (Noble gases): He, Ne, Ar — unreactive

**Periodic trends (increasing across period left→right):**
• Atomic radius decreases
• Ionization energy increases
• Electronegativity increases`,
            simpleExplanation: `The periodic table is like a "map" of all atoms. Elements are arranged by atomic number (number of protons).

• Moving right across a row: atoms get more protons and pull electrons tighter
• Same column = similar behavior (like family members!)`,
            deepExplanation: `Electron configuration explains periodic trends.
Aufbau principle: fill lowest energy orbitals first.
1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d¹⁰ ...

Effective nuclear charge (Zeff) increases across periods, causing trends.`,
            quiz: [
              { q: 'Elements in the same group have similar...?', options: ['Chemical properties', 'Atomic mass', 'Number of protons', 'Electron shells'], correct: 0, explanation: 'Same group = same valence electrons = similar chemical behavior.' },
              { q: 'Noble gases are in group...?', options: ['18', '1', '17', '2'], correct: 0, explanation: 'Group 18 contains He, Ne, Ar, Kr, Xe, Rn — all noble gases.' },
              { q: 'Atomic radius _____ across a period left to right.', options: ['Decreases', 'Increases', 'Stays same', 'Doubles'], correct: 0, explanation: 'More protons pull electrons closer, shrinking the atom.' },
              { q: 'Which group is called Alkali Metals?', options: ['Group 1', 'Group 2', 'Group 17', 'Group 18'], correct: 0, explanation: 'Group 1: Li, Na, K, Rb, Cs, Fr — very reactive metals.' },
              { q: 'What determines an element\'s position in periodic table?', options: ['Atomic number (protons)', 'Atomic mass', 'Number of neutrons', 'Number of electrons only'], correct: 0, explanation: 'Elements are ordered by atomic number = number of protons.' }
            ],
            flashcards: [
              { front: 'Period (row)', back: 'Horizontal row — elements have same number of electron shells' },
              { front: 'Group (column)', back: 'Vertical column — elements have similar chemical properties' },
              { front: 'Noble gases', back: 'Group 18: He, Ne, Ar, Kr, Xe — full outer shells, unreactive' },
              { front: 'Alkali metals', back: 'Group 1: Li, Na, K — 1 valence electron, very reactive' },
              { front: 'Halogens', back: 'Group 17: F, Cl, Br, I — 7 valence electrons, very reactive' },
              { front: 'Atomic number', back: 'Number of protons in the nucleus (unique to each element)' }
            ]
          }
        ]
      },
      { id: 'chem-bonding',   title: 'Chemical Bonding',        subtopics: [] },
      { id: 'chem-reactions', title: 'Chemical Reactions',      subtopics: [] },
      { id: 'chem-organic',   title: 'Organic Chemistry',       subtopics: [] },
      { id: 'chem-acids',     title: 'Acids, Bases & Salts',    subtopics: [] }
    ]
  },

  english: {
    id: 'english',
    label: 'English',
    icon: 'fa-book-open',
    colorVar: '--purple',
    color: '#a78bfa',
    grade: 'Grade 10',
    topics: [
      {
        id: 'eng-grammar',
        title: 'Advanced Grammar',
        subtopics: [
          {
            id: 'eng-tenses',
            title: 'Verb Tenses',
            difficulty: 'medium',
            estimatedMin: 30,
            keywords: ['tense', 'past', 'present', 'future', 'perfect', 'continuous', 'grammar', 'verb', 'had', 'have', 'will have'],
            explanation: `English has 12 main tenses formed by combining time (past/present/future) with aspect (simple/continuous/perfect/perfect continuous).

**Present tenses:**
• Simple: "I study" (habits, facts)
• Continuous: "I am studying" (right now)
• Perfect: "I have studied" (past with present relevance)
• Perfect Continuous: "I have been studying" (ongoing past action)

**Past tenses:**
• Simple: "I studied" (completed action)
• Continuous: "I was studying" (interrupted action)
• Perfect: "I had studied" (before another past event)
• Perfect Continuous: "I had been studying"

**Future tenses:**
• Simple: "I will study" (prediction/decision)
• Continuous: "I will be studying" (ongoing future action)
• Perfect: "I will have studied" (completed by future point)`,
            simpleExplanation: `Tenses tell us WHEN something happens:
• Present: happening now or always
• Past: already happened
• Future: going to happen

Simple = just the fact
Continuous = in progress (am/is/are + -ing)
Perfect = connected to another time (have/had + past participle)`,
            deepExplanation: `Time vs Tense distinction: tense is grammatical form; time is meaning.
Present simple can refer to future ("The train leaves at 9.")
Modal verbs (will, would, can, could, may, might) add nuance.
Conditionals: If + past simple → would + infinitive (2nd conditional)`,
            quiz: [
              { q: '"She ___ in London for 5 years." (still lives there)', options: ['has lived', 'lived', 'is living', 'had lived'], correct: 0, explanation: 'Present perfect for past action continuing to present.' },
              { q: 'Which tense: "I will be sleeping at midnight"?', options: ['Future continuous', 'Future simple', 'Future perfect', 'Present continuous'], correct: 0, explanation: 'Will be + -ing = future continuous (ongoing future action).' },
              { q: '"By 2030, she ___ her degree." (future completion)', options: ['will have finished', 'will finish', 'has finished', 'is finishing'], correct: 0, explanation: 'Future perfect: will have + past participle = completed by a future point.' },
              { q: 'Past perfect: "When I arrived, she ___"', options: ['had already left', 'already left', 'has already left', 'was leaving'], correct: 0, explanation: 'Past perfect for action completed BEFORE another past event.' },
              { q: '"I ___ TV when she called." (interrupted action)', options: ['was watching', 'watched', 'have watched', 'watch'], correct: 0, explanation: 'Past continuous (was/were + -ing) for interrupted ongoing action.' }
            ],
            flashcards: [
              { front: 'Present Perfect', back: 'have/has + past participle\n"I have studied" — past with present relevance' },
              { front: 'Past Perfect', back: 'had + past participle\n"She had left" — before another past event' },
              { front: 'Future Perfect', back: 'will have + past participle\n"I will have finished by 5pm"' },
              { front: 'Present Continuous', back: 'am/is/are + -ing\n"I am studying" — happening right now' },
              { front: 'Past Continuous', back: 'was/were + -ing\n"I was studying" — ongoing past action' },
              { front: 'Future Continuous', back: 'will be + -ing\n"I will be working" — ongoing future action' }
            ]
          }
        ]
      },
      { id: 'eng-writing',  title: 'Essay Writing',     subtopics: [] },
      { id: 'eng-reading',  title: 'Reading Strategies', subtopics: [] },
      { id: 'eng-ielts',    title: 'IELTS Preparation',  subtopics: [] },
      { id: 'eng-speaking', title: 'Speaking & Debate',  subtopics: [] }
    ]
  }

};

// ── Helper: find subtopic by id ──
SNS.findSubtopic = function (id) {
  for (const subject of Object.values(SNS.CURRICULUM)) {
    for (const topic of subject.topics) {
      for (const sub of (topic.subtopics || [])) {
        if (sub.id === id) return { sub, topic, subject };
      }
    }
  }
  return null;
};

// ── Helper: keyword search ──
SNS.searchTopics = function (query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const results = [];

  for (const subject of Object.values(SNS.CURRICULUM)) {
    for (const topic of subject.topics) {
      for (const sub of (topic.subtopics || [])) {
        const searchText = [sub.title, sub.id, ...(sub.keywords || [])].join(' ').toLowerCase();
        if (searchText.includes(q)) {
          results.push({ sub, topic, subject, relevance: sub.title.toLowerCase().startsWith(q) ? 2 : 1 });
        }
      }
    }
  }

  return results.sort((a, b) => b.relevance - a.relevance).slice(0, 10);
};
