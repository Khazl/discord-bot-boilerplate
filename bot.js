const Discord = require('discord.js');
const logger = require('winston');
const auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
const bot = new Discord.Client();
bot.login(auth.token);

const commands = "Available commands:\n" +
    "!commands - List of all available commands\n" +
    "!ping - Returns a pong!\n"

bot.on('ready', (evt) => {
    logger.info('Connected');
});

bot.on('message', (message) => {
    if (message.content.substring(0, 1) === '!') {
        let args = message.content.substring(1).split(' ');
        const cmd = args[0];
        args = args.splice(1);

        logger.info(`${message.content} from ${message.member.displayName}`);

        switch(cmd) {
            case 'commands':
                message.channel.send(commands);
                break;
            case 'ping':
                message.channel.send('pong');
                break;
            /*
            // Activate if no other bot is in channel.
            default:
                message.channel.send('Unknown command. Please use !commands to see available commands.');
            */
        }
    }
});