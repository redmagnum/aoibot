const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
//const firebase = require('firebase');
const pg = require('pg');


const connectionString = "postgres://postgres:hf@localhost:5432/KKI"
var client = new pg.Client(connectionString);


client.connect();

const bot = new Telegraf('653719891:AAF5k70IjcS-dtMbp_G2m7LzyGtulpESHrg')

{
// init Firebase
// const app = firebase.initializeApp({
//     apiKey: "AIzaSyAJXaBzD3smoDPfAvRXkihTj-4VfeoQ-Sk",
//     authDomain: "telebot-f4e18.firebaseapp.com",
//     databaseURL: "https://telebot-f4e18.firebaseio.com",
//     projectId: "telebot-f4e18",
//     storageBucket: "telebot-f4e18.appspot.com",
//     messagingSenderId: "75436487598"
// });
// const ref = firebase.database().ref();

// var db = firebase.database();
// var sref = db.ref("telebot-f4e18");

// sref.on("child", function(snapshot)) {
//     console.log(snapshot.key + " was" + snapshot.val().Date + " | " + snapshot.val().Item + " | " + snapshot.val().Open );
// }

}
{

// bot.on(/^\/say (.+)$/, (msg, props) => {
//   const text = props.match[1];
//   return bot.sendMessage(msg.from.id, text, { replyToMessage: msg.message_id });
// });

// bot.hears(/monitor (.+)/i, ({ reply }, tgl) =>
//   const text = tgl.match[1];
//   reply('Laporan', client.query("SELECT item, open, close FROM monitormaterialsept WHERE tanggal='"+match[1]+"'"
//   )
// )
}

//middleware
// bot.use((ctx, next) => {
//   const start = new Date()
//   return next(ctx).then(() => {
//     const ms = new Date() - start
//     console.log('Response time %sms', ms)
//   })
// })

// bot.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log('Response time %sms', ms)
// })

bot.on('text', (ctx) => ctx.reply('Hello World'))

//catch error
bot.catch((err) => {
  console.log('Ooops', err)
})

bot.command('laporan', (ctx) => {
  
  //var sql = "SELECT item FROM monitormaterialsept where tanggal='2018-09-15'";
  client.query(function (err, result) {
    if (err){
    console.log(result);
    return "sukses"
  }})
 
})


bot.context.db = {
  getScores: () => { return 42 }
}

// bot.on('text', (ctx) => {
//   const scores = ctx.db.getScores(ctx.message.from.username)
//   return ctx.reply(`${ctx.message.from.username}: ${scores}`)
// })

bot.telegram.getMe().then((botInfo) => {
  //bot.options.username = botInfo.username
  return 'TEST'
})

bot.command('foo', (ctx) => ctx.reply('Hello World'))

bot.on('text', (ctx) => {
  // Explicit usage
  ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`)

  // Using shortcut
  ctx.reply(`Hello ${ctx.state.role}`)
})

bot.on('callback_query', (ctx) => {
  // Explicit usage
  ctx.telegram.answerCbQuery(ctx.callbackQuery.id)

  // Using shortcut
  ctx.answerCbQuery()
})

// bot.command('laporan', (ctx) => {

//   var hasil = ''
//   var sql = "SELECT item FROM monitormaterialsept where tanggal='2018-09-15'";
//   client.query(sql, function (err, results) {
//     if (err){
//       throw err;
//     } 
//     console.log(results[0]);
//     hasil = (results[0])
//   })
//   ctx.reply(hasil)

// })

// bot.command('laporan', ({ reply }) =>

//     reply('Laporan', sref.on("child", function(snapshot) {
//         console.log(snapshot.key + " was" + snapshot.val().Date + " | "
//          + snapshot.val().Item + " | " + snapshot.val().Open );
//     }))
// )


//awalan
bot.start((ctx) => ctx.reply('Welcome!'))

//state sudah ada
bot.help((ctx) => ctx.reply('Send me a sticker'))


bot.on('sticker', (ctx) => ctx.reply('👍'))

//buatan sendiri
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.hears(/buy/i, (ctx) => ctx.reply('Buy-buy'))

bot.use(Telegraf.log())

bot.command('onetime', ({ reply }) =>
  reply('One time keyboard', Markup
    .keyboard(['/simple', '/inline', '/pyramid'])
    .oneTime()
    .resize()
    .extra()
  )
)

bot.command('custom', ({ reply }) => {
  return reply('Custom buttons keyboard', Markup
    .keyboard([
      ['🔍 Search', '😎 Popular'], // Row1 with 2 buttons
      ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
      ['📢 Ads', '⭐️ Rate us', '👥 Share'] // Row3 with 3 buttons
    ])
    .oneTime()
    .resize()
    .extra()
  )
})

bot.hears('🔍 Search', ctx => ctx.reply('Yay!'))
bot.hears('📢 Ads', ctx => ctx.reply('Free hugs. Call now!'))

bot.command('special', (ctx) => {
  return ctx.reply('Special buttons keyboard', Extra.markup((markup) => {
    return markup.resize()
      .keyboard([
        markup.contactRequestButton('Send contact'),
        markup.locationRequestButton('Send location')
      ])
  }))
})

bot.command('pyramid', (ctx) => {
  return ctx.reply('Keyboard wrap', Extra.markup(
    Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
      wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
    })
  ))
})

bot.command('simple', (ctx) => {
  return ctx.replyWithHTML('<b>Coke</b> or <i>Pepsi?</i>', Extra.markup(
    Markup.keyboard(['Coke', 'Pepsi'])
  ))
})

bot.command('inline', (ctx) => {
  return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', Extra.HTML().markup((m) =>
    m.inlineKeyboard([
      m.callbackButton('Coke', 'Coke'),
      m.callbackButton('Pepsi', 'Pepsi')
    ])))
})

bot.command('random', (ctx) => {
  return ctx.reply('random example',
    Markup.inlineKeyboard([
      Markup.callbackButton('Coke', 'Coke'),
      Markup.callbackButton('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
      Markup.callbackButton('Pepsi', 'Pepsi')
    ]).extra()
  )
})

bot.command('caption', (ctx) => {
  return ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' },
    Extra.load({ caption: 'Caption' })
      .markdown()
      .markup((m) =>
        m.inlineKeyboard([
          m.callbackButton('Plain', 'plain'),
          m.callbackButton('Italic', 'italic')
        ])
      )
  )
})

bot.hears(/\/wrap (\d+)/, (ctx) => {
  return ctx.reply('Keyboard wrap', Extra.markup(
    Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
      columns: parseInt(ctx.match[1])
    })
  ))
})

bot.action('Dr Pepper', (ctx, next) => {
  return ctx.reply('👍').then(() => next())
})

bot.action('plain', async (ctx) => {
  ctx.editMessageCaption('Caption', Markup.inlineKeyboard([
    Markup.callbackButton('Plain', 'plain'),
    Markup.callbackButton('Italic', 'italic')
  ]))
})

bot.action('italic', (ctx) => {
  ctx.editMessageCaption('_Caption_', Extra.markdown().markup(Markup.inlineKeyboard([
    Markup.callbackButton('Plain', 'plain'),
    Markup.callbackButton('* Italic *', 'italic')
  ])))
})

bot.action(/.+/, (ctx) => {
  return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)
})

bot.startPolling()