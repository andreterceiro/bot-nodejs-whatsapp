// Requires
const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();
const path = require('path');
const fs = require('fs');
let sessions = [];

// WhatsApp handlers
client.on('qr', qr => {
  qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async function(message) {
  if (sessions.indexOf(message.from) == -1) {
    message.reply(readData().welcomeMessage + "\n\n" + getMenuOptions());
    sessions.push(message.from);
  } else {
    if (message.body == "1") {
      message.reply(readData().option1.answer);
    } else if (message.body == "2") {
      message.reply(readData().option2.answer);
    } else {
      message.reply(readData().messageThatTheBotDidNotUnderstand + "\n\n" + getMenuOptions());
    }
  }
});

// Initializing WhatsApp client
client.initialize(); 

// Express, boby-parser and EJS configurations
const express = require('express')
const app = express()
app.use(express.static('public'))
app.set('views', path.join(__dirname, '/views'));
app.set('view engine','ejs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = 3000;

// Route GET "/"
app.get('/', (req, res) => {
  res.render(
    'index',
    {
      'data': readData()
    }
  )
});

// Route POST "/save"
app.post('/save', (req, res) => {
  fs.writeFileSync(
    'data.json',
    JSON.stringify(
      {
        welcomeMessage: req.body['welcome-message'],
        option1: {
          question: req.body['option-1-question'],
          answer: req.body['option-1-answer']
        },
        option2: {
          question: req.body['option-2-question'],
          answer: req.body['option-2-answer']
        },
        messageThatTheBotDidNotUnderstand: req.body['message-that-the-boot-did-not-Understand']
      }
    )
  );

  res.redirect("/");
});

/**
 * Return the saved data in the admin area even if we still 
 * did not configure anything
 * 
 * @returns {object}
 */
function readData() {
  let dataToBeReturned = {
    welcomeMessage: '',
    option1: {
      question: '',
      answer: ''
    },
    option2: {
      question: '',
      answer: ''
    },
    messageThatTheBotDidNotUnderstand: ''
  }
  
  if (! fs.existsSync(path.join(__dirname, 'data.json'))) {
    return dataToBeReturned;
  }

  const savedFields = JSON.parse(
    fs.readFileSync('data.json')
  );
  
  dataToBeReturned['welcomeMessage'] = savedFields['welcomeMessage'];
  dataToBeReturned['option1'] = {
    question: savedFields.option1?.question,
    answer: savedFields.option1?.answer,
  };
  dataToBeReturned['option2'] = {
    question: savedFields.option2?.question,
    answer: savedFields.option2?.answer,
  };
  dataToBeReturned['messageThatTheBotDidNotUnderstand'] = savedFields['messageThatTheBotDidNotUnderstand'];

  return dataToBeReturned;
}

/**
 * Returns the menu with the options
 * 
 * @returns {string}
 */
function getMenuOptions() {
  let data = readData();
  let menu = '';
  menu += "1- " + data.option1.question + "\n";
  menu += "2- " + data.option2.question + "\n";

  return menu;
}

// Express listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});