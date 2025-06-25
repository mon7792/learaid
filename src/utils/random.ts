/**
 * Helper function to generate random Docker-style names for diagrams
 * Follows the pattern: adjective_noun (e.g., "focused_hopper", "eloquent_ferret")
 */

const adjectives = [
    'admiring', 'adoring', 'affectionate', 'agitated', 'amazing', 'angry', 'awesome',
    'beautiful', 'blissful', 'bold', 'boring', 'brave', 'busy', 'charming', 'clever',
    'compassionate', 'competent', 'condescending', 'confident', 'cranky', 'crazy',
    'dazzling', 'determined', 'distracted', 'dreamy', 'eager', 'ecstatic', 'elastic',
    'elated', 'elegant', 'eloquent', 'epic', 'fervent', 'festive', 'flamboyant',
    'focused', 'friendly', 'frosty', 'funny', 'gallant', 'gifted', 'goofy', 'gracious',
    'happy', 'hardcore', 'heuristic', 'hopeful', 'hungry', 'infallible', 'inspiring',
    'intelligent', 'interesting', 'jolly', 'jovial', 'keen', 'kind', 'laughing',
    'loving', 'lucid', 'magical', 'modest', 'musing', 'mystifying', 'naughty',
    'nervous', 'nice', 'nifty', 'nostalgic', 'objective', 'optimistic', 'peaceful',
    'pedantic', 'pensive', 'practical', 'priceless', 'quirky', 'quizzical', 'relaxed',
    'reverent', 'romantic', 'sad', 'serene', 'sharp', 'silly', 'sleepy', 'stoic',
    'strange', 'suspicious', 'sweet', 'tender', 'thirsty', 'trusting', 'unruffled',
    'upbeat', 'vibrant', 'vigilant', 'vigorous', 'wizardly', 'wonderful', 'xenodochial',
    'youthful', 'zealous', 'zen'
  ];
  
  const nouns = [
    'albattani', 'allen', 'almeida', 'archimedes', 'ardinghelli', 'aryabhata',
    'austin', 'babbage', 'banach', 'bardeen', 'bartik', 'bassi', 'beaver',
    'bell', 'benz', 'bhabha', 'bhaskara', 'blackwell', 'bohr', 'booth',
    'borg', 'bose', 'boyd', 'brhmagupta', 'brattain', 'brown', 'carson',
    'chandrasekhar', 'shannon', 'clarke', 'colden', 'cori', 'cray', 'curran',
    'curie', 'darwin', 'davinci', 'dijkstra', 'dubinsky', 'easley', 'edison',
    'einstein', 'elion', 'engelbart', 'euclid', 'euler', 'fermat', 'fermi',
    'feynman', 'franklin', 'galileo', 'gates', 'goldberg', 'goldstine',
    'goldwasser', 'golick', 'goodall', 'hamilton', 'hawking', 'heisenberg',
    'hermann', 'heyrovsky', 'hodgkin', 'hoover', 'hopper', 'hugle', 'hypatia',
    'ishizaka', 'jackson', 'jang', 'jennings', 'jepsen', 'johnson', 'joliot',
    'jones', 'kalam', 'kapitsa', 'kare', 'keldysh', 'keller', 'kepler',
    'khorana', 'kilby', 'kirch', 'knuth', 'kowalevski', 'lalande', 'lamarr',
    'lamport', 'leakey', 'leavitt', 'lichterman', 'liskov', 'lovelace',
    'lumiere', 'mahavira', 'mayer', 'mccarthy', 'mcclintock', 'mclean',
    'mcnulty', 'meitner', 'meninsky', 'mestorf', 'mirzakhani', 'morse',
    'murdock', 'neumann', 'newton', 'nobel', 'noether', 'northcutt',
    'noyce', 'panini', 'pare', 'pasteur', 'payne', 'perlman', 'pike',
    'poincare', 'poitras', 'ptolemy', 'raman', 'ramanujan', 'ride',
    'ritchie', 'roentgen', 'rosalind', 'saha', 'sammet', 'shaw',
    'shirley', 'shockley', 'sinoussi', 'snyder', 'spence', 'stallman',
    'stonebraker', 'swanson', 'swartz', 'swirles', 'tesla', 'thompson',
    'torvalds', 'turing', 'varahamihira', 'visvesvaraya', 'volhard',
    'wescoff', 'williams', 'wilson', 'wing', 'wozniak', 'wright',
    'yalow', 'yonath', 'zhukovsky'
  ];
  
  /**
   * Generates a random Docker-style name for diagrams
   * @returns A string in the format "adjective_noun"
   */
  export function generateRandomName(): string {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    
    return `${randomAdjective}_${randomNoun}`;
  }
  