// backend/generate_campaign.js
const fs = require("fs");
const path = require("path");

/*
  Adventure Campaign: "The Atlas of Asterfall"
  Theme: A cinematic sky-island adventure where a broken world can only be restored
  by solving Python challenges hidden inside ancient rune-tech ruins.
*/

const campaignData = [
  {
    id: 1,
    title: "The Sky Gate Awakens",
    chapter: "Act I — The Call to Adventure",
    environmental_theme: "Sky Kingdom Restoration",
    programming_concept: "Variables",
    story_text:
      "On the edge of the floating city of Asterfall, an ancient machine wakes for the first time in centuries. Its message is simple: the world can still be saved, but only if the lost Code Atlas is restored. You are chosen as the Archive Runner, the one who will carry knowledge across the broken skylands. Before the journey begins, the Gate of Records asks one question: can you store the truth of the world in memory?",
    lesson_text:
      "Variables are named containers used to store values in Python. They help a program remember information such as counts, names, scores, and states. A variable can be created by using the assignment operator =. Once stored, the value can be used, updated, and passed into calculations.",
    level_story_before_quiz:
      "The first rune gate opens only when the Archive Runner proves they can hold knowledge safely. Every answer powers one crystal on the bridge toward the skyship dock.",
    quizzes: [
      {
        story_question:
          "The Gate of Records asks: if the expedition begins with 50 sky-keys in reserve, which line correctly stores that number in a variable named keys?",
        question: "How do you properly assign the integer 50 to a variable named keys in Python?",
        options: [
          "let keys = 50",
          "keys = 50",
          "val keys = 50",
          "int keys = 50;"
        ],
        correct_index: 1,
        explanation:
          "In Python, assignment is done with =. The name keys now stores the value 50, just like the Archive Runner stores the first supply count before leaving Asterfall."
      },
      {
        story_question:
          "A mechanic on the dock adds 20 more sky-keys to the expedition chest. Which update keeps the story accurate?",
        question: "If 20 more keys are added, how do you update the keys variable?",
        options: [
          "keys = keys + 20",
          "keys => 70",
          "add 20 to keys",
          "keys: 70"
        ],
        correct_index: 0,
        explanation:
          "keys = keys + 20 increases the stored value by 20. This mirrors the expedition receiving extra supplies before takeoff."
      },
      {
        story_question:
          "A scout says the captain's name must be written in memory, but the label cannot begin with a number or contain spaces. Which variable name is valid?",
        question: "Which of the following is a valid Python variable name?",
        options: ["2captain", "sky-routes", "captain_name", "captain name"],
        correct_index: 2,
        explanation:
          "captain_name is valid because Python variable names can use letters and underscores, but not spaces or leading numbers."
      },
      {
        story_question:
          "The archive console starts with x = 10, then the crew overwrites it with x = 15. What value survives in memory?",
        question: "What is the value of x after this code?\nx = 10\nx = 15",
        options: ["10", "15", "25", "Error"],
        correct_index: 1,
        explanation:
          "The second assignment replaces the first one. The final value of x is 15."
      },
      {
        story_question:
          "Before the bridge unfolds, the console asks which symbol performs assignment in Python. What should the Runner choose?",
        question: "Which symbol is used for assignment in Python?",
        options: ["==", "=", ":=", "!="],
        correct_index: 1,
        explanation:
          "The = symbol assigns a value to a variable. The bridge begins to form when the correct symbol is chosen."
      }
    ],
    level_complete_story:
      "The first crystal lights up. The sky bridge extends across the void, and the Archive Runner steps toward the waiting skyship."
  },

  {
    id: 2,
    title: "The Flooding Citadel",
    chapter: "Act I — The Journey Begins",
    environmental_theme: "Storm Control",
    programming_concept: "If / Elif / Else",
    story_text:
      "The skyship reaches the Flooding Citadel, where tidal engines have gone wild and the lower chambers are filling with water. The crew must react quickly: open the floodgates if danger rises, hold steady if conditions are safe, and trigger emergency systems if the pressure becomes extreme. The citadel listens only to logic.",
    lesson_text:
      "Conditional statements let programs make decisions. The if block runs when a condition is true. elif checks additional conditions if earlier ones fail. else runs when no earlier condition matches. Together they help a program respond differently to different situations.",
    level_story_before_quiz:
      "Water pounds the citadel walls. Each correct answer stabilizes one valve and prevents the ancient machines from drowning.",
    quizzes: [
      {
        story_question:
          "The water level is rising above the safe line. Which code opens the gates only when the water is strictly greater than 100?",
        question: "Which code block correctly opens the gates if water_level is strictly greater than 100?",
        options: [
          "if water_level > 100:\n    open_gates()",
          "if (water_level > 100) {\n    open_gates();\n}",
          "if water_level => 100 then\n    open_gates()",
          "if water_level > 100\n    open_gates()"
        ],
        correct_index: 0,
        explanation:
          "The Python condition uses if with a colon, and the body is indented. It runs only when water_level is greater than 100."
      },
      {
        story_question:
          "The captain says: if the water is high, open the gates; if it is medium, activate pumps; otherwise, seal the floors. Which keyword handles the middle path?",
        question: "What keyword is used in Python to check another condition after if?",
        options: ["elseif", "elif", "otherwise", "nextif"],
        correct_index: 1,
        explanation:
          "elif is the Python keyword for an additional condition after if."
      },
      {
        story_question:
          "The control tablet shows x = 5. The crew checks whether x > 10. What does the citadel decide?",
        question: "What is the result of checking x > 10 when x = 5?",
        options: ["True", "False", "Null", "Error"],
        correct_index: 1,
        explanation:
          "Since 5 is not greater than 10, the condition is False."
      },
      {
        story_question:
          "The emergency routine says: if the tide is safe, remain calm; if not, take another path. Which branch runs when no condition is true?",
        question: "Which part of an if statement runs when no condition is true?",
        options: ["then", "elif", "else", "for"],
        correct_index: 2,
        explanation:
          "The else block runs when all earlier conditions fail."
      },
      {
        story_question:
          "The citadel asks the crew to test whether two numbers match exactly. Which operator compares equality in Python?",
        question: "Which operator checks equality in Python?",
        options: ["=", "==", "=>", "<>"],
        correct_index: 1,
        explanation:
          "== is used to compare two values for equality. A single = assigns a value."
      }
    ],
    level_complete_story:
      "The floodgates lock into place. The lower chambers drain, revealing a hidden stairway carved with star maps."
  },

  {
    id: 3,
    title: "The Starforge Corridor",
    chapter: "Act II — Into the Unknown",
    environmental_theme: "Ancient Machine Repair",
    programming_concept: "For Loops",
    story_text:
      "Deep inside the mountain lies the Starforge Corridor, where ten broken solar mirrors must be realigned before the skies darken forever. A single repair would not be enough. The crew needs a repeating pattern, a disciplined march through every mirror, one by one, until the whole corridor wakes again.",
    lesson_text:
      "For loops repeat a block of code for each item in a sequence or for a specific number of times. In Python, range() is commonly used when the exact number of repetitions is known. Loops are ideal for repeated tasks such as counting, scanning, or repairing many objects.",
    level_story_before_quiz:
      "Each mirror in the corridor is a checkpoint. Every correct answer re-aligns another beam and lights the path deeper into the forge.",
    quizzes: [
      {
        story_question:
          "The crew must recalibrate exactly 10 solar mirrors. Which Python loop repeats the action 10 times?",
        question: "How do you loop exactly 10 times in Python to call recalibrate()?",
        options: [
          "for i = 1 to 10:\n    recalibrate()",
          "loop 10:\n    recalibrate()",
          "for i in range(10):\n    recalibrate()",
          "for (i=0; i<10; i++) {\n    recalibrate();\n}"
        ],
        correct_index: 2,
        explanation:
          "for i in range(10): repeats the block 10 times, using values from 0 to 9."
      },
      {
        story_question:
          "The captain counts the glowing mirrors and asks: if the loop uses range(5), how many times will the repair code run?",
        question: "How many times does for i in range(5): run?",
        options: ["4", "5", "6", "10"],
        correct_index: 1,
        explanation:
          "range(5) produces 5 values: 0, 1, 2, 3, and 4. So the loop runs 5 times."
      },
      {
        story_question:
          "A hidden terminal reads range(3). What sequence does the corridor expect?",
        question: "What does range(3) produce?",
        options: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "3, 4, 5"],
        correct_index: 1,
        explanation:
          "range(3) starts at 0 and ends before 3, so it produces 0, 1, 2."
      },
      {
        story_question:
          "The forgemaster says the number of mirror rotations is already known. Which loop type fits best?",
        question: "Which loop is best when you know the number of iterations?",
        options: ["for loop", "infinite loop", "while True", "switch"],
        correct_index: 0,
        explanation:
          "A for loop is ideal when the iteration count is known beforehand."
      },
      {
        story_question:
          "The repair drone prints the current mirror number for each pass. What is the output of this code?\nfor i in range(2):\n    print(i)",
        question: "What is the output of:\nfor i in range(2):\n    print(i)",
        options: ["1 2", "0 1", "0 1 2", "2 3"],
        correct_index: 1,
        explanation:
          "The loop prints 0 and 1, because range(2) generates two values starting from 0."
      }
    ],
    level_complete_story:
      "The final mirror catches the dawn. A secret passage opens behind the Starforge, leading toward the heart of the mountain."
  },

  {
    id: 4,
    title: "The Whispering Archive",
    chapter: "Act II — The Hidden Library",
    environmental_theme: "Ancient Knowledge Vault",
    programming_concept: "Functions",
    story_text:
      "Beyond the forge lies the Whispering Archive, a library built into the bones of the mountain. Its walls are filled with repeating spells and old machine commands. The archivist warns the crew: if the same action must be performed again and again, do not carve it twice. Wrap it into a spell, give it a name, and call it whenever needed.",
    lesson_text:
      "Functions are reusable blocks of code that perform a specific task. They reduce repetition, make code easier to read, and help organize larger programs. In Python, functions are defined with def, and they can accept inputs called parameters.",
    level_story_before_quiz:
      "Each vault door opens only after the Archive Runner demonstrates that a task can be packed neatly into a reusable spell.",
    quizzes: [
      {
        story_question:
          "The archivist asks for a reusable spell named clean_air. Which line correctly defines the function?",
        question: "Identify the correct way to define a function named clean_air in Python:",
        options: [
          "function clean_air():",
          "define clean_air():",
          "def clean_air():",
          "func clean_air() {"
        ],
        correct_index: 2,
        explanation:
          "Python uses def to define a function. The function body comes after a colon and indentation."
      },
      {
        story_question:
          "Once the spell is written, how does the crew activate it during the mission?",
        question: "How do you call a Python function named greet()?",
        options: ["greet", "greet()", "def greet", "call greet()"],
        correct_index: 1,
        explanation:
          "A function is called by writing its name followed by parentheses."
      },
      {
        story_question:
          "The archivist says the same cleanup logic will be used in many rooms. Why are functions useful?",
        question: "What is the purpose of a function?",
        options: [
          "To store files",
          "To repeat code and organize tasks",
          "To create lists only",
          "To rename variables automatically"
        ],
        correct_index: 1,
        explanation:
          "Functions help reuse code, reduce repetition, and keep programs organized."
      },
      {
        story_question:
          "A message on the wall reads def whisper():. Which of these is the correct function call?",
        question: "Which of these is a valid function call for def greet():",
        options: ["greet", "greet()", "def greet", "call greet()"],
        correct_index: 1,
        explanation:
          "Calling greet() executes the function."
      },
      {
        story_question:
          "The last page of the archive explains that some spells receive inputs from the user. What are those inputs called?",
        question: "Which statement best describes parameters?",
        options: [
          "Values passed into a function",
          "The name of the function",
          "The output of a function only",
          "A type of loop"
        ],
        correct_index: 0,
        explanation:
          "Parameters are values passed into a function so it can work with different inputs."
      }
    ],
    level_complete_story:
      "A locked shelf rotates, revealing a map to the next relic: the living pages of the Atlas itself."
  },

  {
    id: 5,
    title: "The Caravan of Beasts",
    chapter: "Act II — Companions Join the Quest",
    environmental_theme: "Creature Tracking",
    programming_concept: "Lists",
    story_text:
      "Outside the archive, the expedition crosses a valley where ancient beasts slowly return after years of silence. Wolves, hawks, bears, and foxes gather at the edge of the road like a lost caravan. The crew must track every sighting in an ordered record so the realm can be rebuilt with care.",
    lesson_text:
      "Lists store multiple values in a single ordered, mutable collection. They are written with square brackets. Lists are useful when you want to keep items in order, change them later, or add new entries as the story evolves.",
    level_story_before_quiz:
      "The caravan only moves when the expedition logs each creature correctly. Each answer brings another companion into the journey.",
    quizzes: [
      {
        story_question:
          "The scouts see a wolf, a hawk, and a bear moving through the mist. How should the expedition create a Python list for them?",
        question: "How do you create a Python list containing Wolf, Hawk, and Bear?",
        options: [
          "animals = ('Wolf', 'Hawk', 'Bear')",
          "animals = ['Wolf', 'Hawk', 'Bear']",
          "animals = {'Wolf', 'Hawk', 'Bear'}",
          "animals = <'Wolf', 'Hawk', 'Bear'>"
        ],
        correct_index: 1,
        explanation:
          "Square brackets create a list in Python."
      },
      {
        story_question:
          "The keeper asks which bracket shape belongs to lists in the expedition ledger.",
        question: "Which bracket style is used for lists in Python?",
        options: ["()", "{}", "[]", "<>"],
        correct_index: 2,
        explanation:
          "Lists use square brackets."
      },
      {
        story_question:
          "A young scout wants to add one more fox to the end of the creature log. Which method should be used?",
        question: "Which method adds an item to the end of a list?",
        options: ["add()", "append()", "insert_end()", "push()"],
        correct_index: 1,
        explanation:
          "append() adds an item to the end of a Python list."
      },
      {
        story_question:
          "The crew checks the first creature in the log. Which index does the first item have?",
        question: "What is the index of the first item in a Python list?",
        options: ["1", "0", "-1", "None"],
        correct_index: 1,
        explanation:
          "Python uses zero-based indexing, so the first item is at index 0."
      },
      {
        story_question:
          "The captain asks which structure is both ordered and mutable, perfect for the creature caravan record.",
        question: "Which data structure is ordered and mutable?",
        options: ["tuple", "list", "string", "range"],
        correct_index: 1,
        explanation:
          "Lists are ordered and mutable."
      }
    ],
    level_complete_story:
      "The creature caravan joins the expedition. Together, they travel toward the ridge where the next ruin glows under moonlight."
  },

  {
    id: 6,
    title: "The Map of Hidden Valleys",
    chapter: "Act III — The Inner Chamber",
    environmental_theme: "Route Intelligence",
    programming_concept: "Dictionaries",
    story_text:
      "The mountain opens into a chamber filled with dozens of carved routes. Each valley has a name, each name has a meaning, and each meaning has a value. To guide the expedition, the crew needs a map that stores pairs of related information: route names and their exact status. The chamber accepts nothing less than a dictionary.",
    lesson_text:
      "Dictionaries store data as key-value pairs. They are useful when you want fast lookups by a unique key, such as a name, label, or identifier. In Python, dictionaries are written with curly braces, and each key is separated from its value by a colon.",
    level_story_before_quiz:
      "The map room lights up one rune at a time. Every correct answer reveals a new valley route and a safer path through the mountain.",
    quizzes: [
      {
        story_question:
          "The crew wants to connect Sector A with the value 6.5. Which syntax creates the correct Python dictionary entry?",
        question: "Which syntax creates a Python dictionary associating Sector A with 6.5?",
        options: [
          "soil_ph = ['Sector A': 6.5]",
          "soil_ph = {'Sector A': 6.5}",
          "soil_ph = ('Sector A', 6.5)",
          "soil_ph = {Sector A = 6.5}"
        ],
        correct_index: 1,
        explanation:
          "Dictionaries use curly braces and a colon between key and value."
      },
      {
        story_question:
          "The map keeper says the left side of each entry is the route label. What is it called?",
        question: "What is the name for the left side in a dictionary entry?",
        options: ["value", "key", "index", "label"],
        correct_index: 1,
        explanation:
          "The left side is the key."
      },
      {
        story_question:
          "A carved stone shows a symbol between the route name and its value. Which symbol does a dictionary use?",
        question: "What symbol separates a key and value in a dictionary?",
        options: ["=", ":", "->", ","],
        correct_index: 1,
        explanation:
          "A colon separates key and value in a dictionary pair."
      },
      {
        story_question:
          "The expedition wants to store city names with their populations. Which structure is best for this map?",
        question: "Which data type is best for storing city name to population pairs?",
        options: ["list", "dictionary", "tuple", "set"],
        correct_index: 1,
        explanation:
          "A dictionary is ideal for key-value pair lookups."
      },
      {
        story_question:
          "The chamber marks one path with the key 'Sector A'. How does the crew access its value?",
        question: "How do you access the value for the key 'Sector A' in soil_ph?",
        options: [
          "soil_ph('Sector A')",
          "soil_ph['Sector A']",
          "soil_ph{'Sector A'}",
          "soil_ph->'Sector A'"
        ],
        correct_index: 1,
        explanation:
          "Dictionary values are accessed using square brackets with the key inside."
      }
    ],
    level_complete_story:
      "The map shifts. A hidden elevator descends into the final chamber where the Code Atlas sleeps."
  },

  {
    id: 7,
    title: "The Final Logbook",
    chapter: "Act III — The Last Trial",
    environmental_theme: "World Restoration Core",
    programming_concept: "File Handling",
    story_text:
      "At the deepest level of the mountain, the expedition finds the Core Vault, where the world's memory has been sealed inside an ancient logbook. The logbook is corrupted. One wrong move could erase the last records of the old world. The Archive Runner must write a fresh record, preserve the truth, and restart the restoration sequence.",
    lesson_text:
      "File handling allows programs to read from and write to external files. In Python, open() is used to access a file, and the mode 'w' opens the file for writing. This is useful for saving logs, reports, or data that should persist after the program ends.",
    level_story_before_quiz:
      "The final chamber waits in silence. Every correct answer rewrites a missing page of the world and brings the Atlas closer to completion.",
    quizzes: [
      {
        story_question:
          "The Core Vault needs a fresh record in climate_log.txt. Which line opens the file in write mode?",
        question: "How do you properly open a file named climate_log.txt in write mode in Python?",
        options: [
          "file = open('climate_log.txt', 'w')",
          "file = write('climate_log.txt')",
          "file = open('climate_log.txt', 'write')",
          "file = File.open('climate_log.txt', 'w')"
        ],
        correct_index: 0,
        explanation:
          "open('climate_log.txt', 'w') opens the file in write mode."
      },
      {
        story_question:
          "The archivist says the team must read an old page from the logbook. Which file mode should be used?",
        question: "Which mode is used to read a file?",
        options: ["r", "w", "a", "x"],
        correct_index: 0,
        explanation:
          "The mode r opens a file for reading."
      },
      {
        story_question:
          "A second line must be added to the end of the old log without deleting the first one. Which mode fits?",
        question: "Which mode appends new content to the end of a file?",
        options: ["r", "w", "a", "c"],
        correct_index: 2,
        explanation:
          "The mode a appends data to the end of the file."
      },
      {
        story_question:
          "After writing the new world record, the crew must seal the logbook properly. What does close() do?",
        question: "What does close() do after file operations?",
        options: [
          "Deletes the file",
          "Saves and releases the file resource",
          "Renames the file",
          "Encrypts the file"
        ],
        correct_index: 1,
        explanation:
          "close() releases the file resource and finalizes the file operation."
      },
      {
        story_question:
          "The final inscription says the new record must be written as text. Which statement is correct for writing to a file object f?",
        question: "Which statement is correct for writing text to a file object f?",
        options: [
          "f.write('Hello')",
          "f.read('Hello')",
          "f.open('Hello')",
          "f.save('Hello')"
        ],
        correct_index: 0,
        explanation:
          "f.write('Hello') writes text into the file."
      }
    ],
    level_complete_story:
      "The final page is restored. The Code Atlas awakens, and light spreads across the skylands like sunrise after a long storm."
  }
];

const dirPath = path.join(__dirname, "data");
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

const filePath = path.join(dirPath, "campaign.json");
fs.writeFileSync(filePath, JSON.stringify(campaignData, null, 2), "utf8");

console.log("✅ Campaign JSON regenerated successfully at data/campaign.json");