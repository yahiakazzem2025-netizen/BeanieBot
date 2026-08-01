require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  PermissionsBitField,
  EmbedBuilder
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

let spins = {};

const prizes = [
  "VIP 🎁",
  "شحن نيترو 3-ايام مجانا",
  "حظ سيء 😅",
  "حظ سيء 😅",
  "لقة مجانية عدد(1-3) 🎰",
  "750 روبكس",
  "تقديم مجاني للادارى❄️",
  "اعلان مجاني لسيرفرك📢",
  "حظ سيء 😅",
  "مساعد للسيرفر",
  "نيترو جيمنج شهر",
  "نيترو باسك",
  "لك 10 روب"
];


client.once("ready", () => {
  console.log(`✅ البوت شغال: ${client.user.tag}`);
});


client.on("messageCreate", async (message) => {
  if (message.author.bot) return;


  // إعطاء لفة
  if (message.content.startsWith("+spin")) {

    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      return message.reply("❌ هذا الأمر للإدارة فقط");
    }

    const user = message.mentions.users.first();

    if (!user) {
      return message.reply("❌ منشن العضو");
    }

    spins[user.id] = (spins[user.id] || 0) + 1;

    return message.reply(
      `🎡 تم إعطاء ${user} لفة!\n🎟️ عدد اللفات: ${spins[user.id]}`
    );
  }


  // لف العجلة
  if (message.content === "!spin") {

    const userSpins = spins[message.author.id] || 0;

    if (userSpins <= 0) {
      return message.reply("❌ ليس لديك لفات متاحة");
    }

    spins[message.author.id]--;

    const prize = prizes[Math.floor(Math.random() * prizes.length)];

    const embed = new EmbedBuilder()
      .setTitle("🎡 عجلة الحظ")
      .setDescription(
        `🎉 مبروك ${message.author}\n\n🎁 الجائزة:\n**${prize}**\n\n🎟️ اللفات المتبقية: ${spins[message.author.id]}`
      )
      .setColor("Gold");

    message.reply({
      embeds: [embed]
    });
  }
});


client.login(process.env.TOKEN);
