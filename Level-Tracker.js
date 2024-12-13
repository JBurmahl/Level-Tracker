
const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/levels', { useNewUrlParser: true, useUnifiedTopology: true });

const levelSchema = new mongoose.Schema({
  userId: String,
  level: Number
});

const Level = mongoose.model('Level', levelSchema);

client.on('ready', () => {
  console.log('Bot is online!');
});

client.on('message', async (message) => {
  if (message.author.bot) return;

  const levelUpMessage = /Level up! You are now level (\d+)/i;
  const match = message.content.match(levelUpMessage);

  if (match) {
    const level = parseInt(match[1]);
    const userId = (link unavailable);

    const levelDoc = await Level.findOne({ userId });
    if (levelDoc) {
      levelDoc.level = level;
      await levelDoc.save();
    } else {
      const newLevelDoc = new Level({ userId, level });
      await newLevelDoc.save();
    }

    const role = message.guild.roles.cache.find((role) => role.name === `Level ${level}`);
    if (role) {
      message.member.roles.add(role);
      console.log(`Assigned Level ${level} role to ${message.author.tag}`);
    }
  }
});

client.login('YOUR_BOT_TOKEN');