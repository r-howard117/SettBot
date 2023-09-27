/**
 * An array containing various Sett voice lines from the game.
 */
const settLines = [
    "I don't like hurtin' people. I like the money I get from hurtin' people.",
    "The crackin' of bones is the clinkin' of coins.",
    "If I ever find my old man... well, I hope he's been trainin'.",
    "You swing on the boss? You better not miss.",
    "Nothin' people hate more than a guy who makes somethin' of himself.",
    "Nothin' I hate more than people with sleeves.",
    "My coat costs more than this whole damn place.",
    "They call me a thug. I call me an entrepreneur.",
    "Ah, the line of people trying to take me down just ain't long enough.",
    "I ain't no 'half-breed'... I'm a full breed, and I'm the only one.",
    "Too hairy for humans, too smooth for Vastaya. What're you gonna do?",
    "I don't bother with jabs; if you're throwing, throw it hard.",
    "It's all fun and games 'til someone gets their face caved in.",
    "All words are fightin' words.",
    "Everyone's got a plan, 'til they get slammed into the ground.",
    "All men wanna be me, too bad they ain't me.",
    "Everyone loses... well, almost everyone.",
    "Some beatings you just gotta do yourself.",
    "Somewhere out there is a demand that needs supplyin'.",
    "Y'know... you don't really know someone until you fought 'em to the death.",
    "Ionia... place was so damn quiet before I came along.",
    "Violence is my business, and business is booming.",
    "People say they don't like violence... but they all watch.",
    "Glad I don't have to fight me.",
    "Bein' the boss is a lot better than not bein' the boss.",
    "Momma always said I had her temper.",
    "Only thing an honest livin' makes you is broke.",
    "A wise master once said, 'Be like water.' Guess I'm kind of a tsunami.",
    "They say you learn a lot from a beating. If that's true, I've made the whole world smarter.",
    "I used to risk my neck in the pit making someone else rich. Now, we do it the other way around. I like that better.",
    "When you're on top, there's always some chump trying to drag you down, pullin' at your feet, scuffin' up your nice shoes.",
    "They called me 'Sett the Beast-Boy Bastard.' Hah! Now, it's 'Sett the Beast-Man Bastard.'",
    "I remember my first fight. I ran home cryin' to Momma... she wiped my tears with her claws.",
    "Y'know, life's really all about the quiet time between beatdowns.",
    "Things I love... uh, my momma, breakin' necks, and fine Ionian silk.",
    "Well... when life gives you lemons, punch life in the throat.",
]
/**
 * Generates a random integer between the specified values
 * @param {*} min the minimum value requested
 * @param {*} max the maximum value requested
 * @returns a random integer
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * Replies to user with a randomly selected Sett quote.
 */
module.exports = {
    name: "wisdom",
    description: "Hear what the boss has to say.",
    //devOnly: Boolean,
    //testOnly: Boolean,
    //options: Object[],


    
    callback: (client, interaction) => {
        let settLine = settLines[getRandomInt(0, settLines.length)];
        interaction.reply(`${settLine}`);
    }
}

