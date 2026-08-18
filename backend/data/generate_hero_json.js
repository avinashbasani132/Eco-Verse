const fs = require('fs');
const path = require('path');

const levelsDir = path.join(__dirname, 'levels');
if (!fs.existsSync(levelsDir)) fs.mkdirSync(levelsDir, { recursive: true });

const levels = {
  "intro": {
    "title": "Prologue: The Fall of Asterveil",
    "concept": "Intro",
    "scenes": [
      {
        "type": "dialogue",
        "speaker": "Royal Sorcerer",
        "text": "The Demon King Vharzul has broken the realm. Our only hope is the ancient summoning ritual..."
      },
      {
        "type": "dialogue",
        "speaker": "Royal Sorcerer",
        "text": "You must awaken, Hero! The kingdom of Asterveil commands you!"
      }
    ]
  },
  "1": {
    "title": "The Summoning of the Hero",
    "concept": "Variables and Data Types",
    "intro_text": "The kingdom’s last sorcerers summon you from another world. The royal court needs to record your identity, age, and class before the journey begins. This is your first lesson: storing information in memory as Variables.",
    "scenes": [
      { "type": "dialogue", "speaker": "Royal Scribe", "text": "Quickly! We must document your essence. What is your chosen identifier?" },
      { "type": "dialogue", "speaker": "Oracle", "text": "Remember, the world stores data in logical structures. Strings, Integers, and Booleans." }
    ]
  },
  "2": {
    "title": "The Trial of Weapons",
    "concept": "If / Elif / Else",
    "intro_text": "You enter the training grounds. Three sacred weapons are offered: Sword, Bow, and Axe. The choices you make create branching paths in your destiny, much like conditional logic.",
    "scenes": [
      { "type": "dialogue", "speaker": "Mentor", "text": "Your path depends on your attributes. Let us test your conditions." }
    ]
  },
  "3": {
    "title": "The Endless Horde",
    "concept": "Loops",
    "intro_text": "Outside the capital, thousands of weak enemies flood the plains. A hero cannot manually strike each enemy one by one. You must harness the power of repetitive action: Loops.",
    "scenes": [
      { "type": "dialogue", "speaker": "Commander", "text": "They just keep coming! Automate your strikes or we are lost!" }
    ]
  },
  "4": {
    "title": "The Vault of Relics",
    "concept": "Data Structures",
    "intro_text": "Deep below the castle lies the Vault of Relics. You must sort your party, organize supplies, and decode the immutable prophecy.",
    "scenes": [
      { "type": "dialogue", "speaker": "Vault Keeper", "text": "Organization is the key to survival. Separate your Arrays, Tuples, and Sets carefully." }
    ]
  },
  "5": {
    "title": "The Spellcraft Library",
    "concept": "Functions",
    "intro_text": "In the ancient library, spells are written once and used many times. Repeating actions manually is wasteful. It is time to forge reusable magical functions.",
    "scenes": [
      { "type": "dialogue", "speaker": "Archmage", "text": "Encapsulate your logic, Hero! Spells require parameters and return powerful results." }
    ]
  },
  "6": {
    "title": "The Guild of Living Armor",
    "concept": "Classes and Objects",
    "intro_text": "At the warrior guild, weapons and companions are not just static items; they are living systems with properties and behaviors. Here, you learn Object-Oriented creation.",
    "scenes": [
      { "type": "dialogue", "speaker": "Guildmaster", "text": "Everything is a blueprint. Create a Hero class to ascend to True Commander status." }
    ]
  },
  "7": {
    "title": "Final Siege: The Demon King’s Throne",
    "concept": "Full Integration / Final Boss",
    "intro_text": "The Demon King Vharzul waits in the shattered throne room. You must combine all previous lessons—variables, conditionals, loops, structures, functions, and classes—to survive his multi-phase siege.",
    "scenes": [
      { "type": "dialogue", "speaker": "Demon King Vharzul", "text": "YOU DARE CHALLENGE MY LOGIC? I WILL DELETE YOU FROM MEMORY!" }
    ]
  }
};

Object.keys(levels).forEach(id => {
  fs.writeFileSync(path.join(levelsDir, `level${id}.json`), JSON.stringify(levels[id], null, 2));
  console.log(`Created level${id}.json`);
});
