// @CC: Chat-GPT ^_^

/**
 * List of already existant categories for seeding DB 
 */
const Categories = [
  { name: "Web Development", description: "the process of developing websites, web applications, and web services" },
  { name: "Mobile App Development", description: "the process of developing mobile applications for mobile devices, such as smartphones and tablets" },
  { name: "Database Management", description: "the process of organizing, storing, and retrieving data efficiently and securely in a database" },
  { name: "Network Administration", description: "the process of managing and maintaining computer networks, including hardware, software, and security" },
  { name: "Cybersecurity", description: "the practice of protecting computer systems and networks from theft, damage, or unauthorized access" },
  { name: "Cloud Computing", description: "the delivery of computing services, including servers, storage, databases, networking, software, analytics, and intelligence, over the internet" },
  { name: "Artificial Intelligence", description: "the simulation of human intelligence processes by machines, especially computer systems, including learning, reasoning, and self-correction" },
  { name: "Machine Learning", description: "a subset of artificial intelligence that enables machines to automatically learn and improve from experience without being explicitly programmed" },
  { name: "Data Science", description: "an interdisciplinary field that involves the extraction, processing, analysis, visualization, and interpretation of large and complex data sets" },
  { name: "UI/UX Design", description: "the process of designing user interfaces and user experiences for digital products, including websites, mobile apps, and software applications" },
  { name: "Game Development", description: "the process of creating video games for consoles, computers, or mobile devices" },
  { name: "DevOps", description: "a set of practices that combines software development (Dev) and IT operations (Ops) to enable faster and more reliable software delivery" },
  { name: "Project Management", description: "the process of planning, organizing, and managing resources to achieve specific goals and objectives within a defined timeline and budget" },
  { name: "IT Consulting", description: "the practice of providing expert advice and guidance to businesses and organizations on how to use information technology to achieve their goals and objectives" },
  { name: "Software Testing", description: "the process of evaluating the quality and performance of software through manual or automated testing" },
  { name: "IT Support", description: "the process of providing technical assistance to users of technology products, such as software, hardware, and networking devices" },
  { name: 'Programming', description: 'the process of giving machines a set of instructions that describe how a program should be carried out'},
  { name: 'Technology', description: 'The application of scientific knowledge for practical purposes, especially in industry.' },
];


/**
 * List of already existant tags for seeding DB
 */
const Tags = [
  { name: 'Node.js', description: 'A popular server-side JavaScript runtime built on Chrome\'s V8 JavaScript engine.' },
  { name: 'Express', description: 'A fast and minimalist web framework for Node.js.' },
  { name: 'API', description: 'An acronym for "Application Programming Interface," which is a set of protocols and tools used for building software applications.' },
  { name: 'HTML', description: 'Hypertext Markup Language, used for creating web pages and applications.' },
  { name: 'CSS', description: 'Cascading Style Sheets, used for styling and formatting HTML content.' },
  { name: 'Bootstrap', description: 'A popular CSS framework for building responsive and mobile-first websites.' },
  { name: 'React', description: 'A popular JavaScript library for building user interfaces and single-page applications.' },
  { name: 'JavaScript', description: 'A high-level programming language used for creating dynamic and interactive web applications.' },
  { name: 'Component', description: 'A modular and reusable part of a larger software application, typically used in building user interfaces.' },
  { name: 'Web Storage', description: 'A set of APIs that allows web applications to store data in the client\'s browser.' },
  { name: 'Cookies', description: 'Small pieces of data that are stored in a user\'s web browser by a website, used for tracking and user authentication.' },
  { name: 'Cybersecurity', description: 'The practice of protecting computer systems, networks, and sensitive data from digital attacks and threats.' },
  { name: 'Network Security', description: 'The practice of securing computer networks from unauthorized access, attacks, and vulnerabilities.' },
  { name: 'Information Security', description: 'The practice of protecting sensitive and confidential information from unauthorized access, use, disclosure, disruption, modification, or destruction.' },
  { name: 'MySQL', description: 'A popular open-source relational database management system.' },
  { name: 'Database Management', description: 'The practice of managing and maintaining databases, including data organization, security, and performance optimization.' },
  { name: 'SQL', description: 'Structured Query Language, used for managing relational databases.' },
  { name: 'OOP', description: 'Object-Oriented Programming, a programming paradigm that organizes software design around data structures and their associated behaviors.' },
  { name: 'State Management', description: 'The practice of managing and storing application state, including user input, system state, and other data.' },
  { name: 'Web Development', description: 'The practice of building web applications and websites, typically using HTML, CSS, and JavaScript.' },
  { name: 'Technology', description: 'The application of scientific knowledge for practical purposes, especially in industry.' },
  { name: 'Template Engine', description: 'A tool used to generate dynamic HTML content using predefined templates and data.' },
  { name: 'Web Security', description: 'The practice of securing web applications and websites from digital attacks and vulnerabilities.' },
  { name: 'SQL Injection', description: 'A type of web vulnerability in which an attacker inserts malicious SQL code into a web form, allowing them to access or manipulate sensitive data in a database.' },
  { name: 'Programming', description: 'the process of giving machines a set of instructions that describe how a program should be carried out'},
  { name: 'LocalStorage', description: 'localStorage is a property that allows JavaScript sites and apps to save key-value pairs in a web browser with no expiration date'},
];

/**
 * list of existant videos names
 */
const VideosNames = [
  'API.mp4',
  'Bootstrap.mp4',
  'Building React Components.mp4',
  'Cookies.mp4',
  'ExpressJS.mp4',
  'information security.mp4',
  'Introduction to React.mp4',
  'JavaScript Basics.mp4',
  'JavaScript Review.mp4',
  'LocalStorage.mp4',
  'MySQL.mp4',
  'Nodejs Built in Modules.mp4',
  'OOP using JS.mp4',
  'React Components.mp4',
  'React States.mp4',
  'ReactJS.mp4',
  'Routing.mp4',
  'sample.mp4',
  'Template Engines.mp4',
  'Web App Security, SQL Injection.mp4'
]

/**
 * list of vidoes names, tag, title, and category
 */
const VideosTags = [  { name: 'API.mp4', tags: ['Node.js', 'Express', 'API'], title: 'API Development with Node.js and Express', category: 'Web Development' },
  { name: 'Bootstrap.mp4', tags: ['HTML', 'CSS', 'Bootstrap'], title: 'Building Responsive Web Pages with Bootstrap', category: 'Web Development' },
  { name: 'Building React Components.mp4', tags: ['React', 'JavaScript', 'Component'], title: 'Building Reusable React Components with JavaScript', category: 'Web Development' },
  { name: 'Cookies.mp4', tags: ['JavaScript', 'Web Storage', 'Cookies'], title: 'Managing Web Storage with Cookies and JavaScript', category: 'Web Development' },
  { name: 'ExpressJS.mp4', tags: ['Node.js', 'Express', 'Web Development'], title: 'Building Web Applications with Express.js and Node.js', category: 'Web Development' },
  { name: 'information security.mp4', tags: ['Cybersecurity', 'Network Security', 'Information Security'], title: 'Introduction to Information and Network Security', category: 'Cybersecurity' },
  { name: 'Introduction to React.mp4', tags: ['React', 'JavaScript', 'Web Development'], title: 'Introduction to React.js for Web Development', category: 'Web Development' },
  { name: 'JavaScript Basics.mp4', tags: ['JavaScript', 'Web Development', 'Programming'], title: 'JavaScript Basics for Web Development and Programming', category: 'Web Development' },
  { name: 'JavaScript Review.mp4', tags: ['JavaScript', 'Web Development', 'Programming'], title: 'Reviewing JavaScript for Web Development and Programming', category: 'Web Development' },
  { name: 'LocalStorage.mp4', tags: ['JavaScript', 'Web Storage', 'LocalStorage'], title: 'Managing Web Storage with Local Storage and JavaScript', category: 'Web Development' },
  { name: 'MySQL.mp4', tags: ['MySQL', 'Database Management', 'SQL'], title: 'Managing Databases with MySQL and SQL', category: 'Database Management' },
  { name: 'Nodejs Built in Modules.mp4', tags: ['Node.js', 'Web Development', 'Programming'], title: 'Building Web Applications with Node.js Built-in Modules', category: 'Web Development' },
  { name: 'OOP using JS.mp4', tags: ['JavaScript', 'OOP', 'Programming'], title: 'Object-Oriented Programming with JavaScript', category: 'Programming' },
  { name: 'React Components.mp4', tags: ['React', 'JavaScript', 'Component'], title: 'Building React Components with JavaScript', category: 'Web Development' },
  { name: 'React States.mp4', tags: ['React', 'JavaScript', 'State Management'], title: 'Managing State in React.js with JavaScript', category: 'Web Development' },
  { name: 'ReactJS.mp4', tags: ['React', 'JavaScript', 'Web Development'], title: 'Building Web Applications with React.js and JavaScript', category: 'Web Development' },
  { name: 'Routing.mp4', tags: ['Node.js', 'Express', 'Web Development'], title: 'Building Web Applications with Routing in Node.js and Express.js', category: 'Web Development' },
  { name: 'sample.mp4', tags: ['Web Development', 'Programming', 'Technology'], title: 'Exploring Web Development and Programming Technologies', category: 'Technology' },
  { name: 'Template Engines.mp4', tags: ['Node.js', 'Web Development', 'Template Engine'], title: 'Building Web Applications with Template Engines in Node.js', category: 'Web Development' },
  { name: 'Web App Security, SQL Injection.mp4', tags: ['Web Security', 'SQL Injection', 'Cybersecurity'], title: 'Securing Web Applications from SQL Injection and Cyber Attacks', category: 'Cybersecurity' }
];

module.exports = {
  Categories,
  Tags,
  VideosNames,
  VideosTags
};