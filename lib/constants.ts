export const LEGAL_SCENARIOS = [
  {
    id: 'traffic-stop',
    title: 'Traffic Stop',
    description: 'Pulled over by police',
    icon: '🚗',
    scripts: {
      whatToSay: [
        'I am exercising my right to remain silent.',
        'I do not consent to any searches.',
        'Am I free to go?',
        'I would like to speak to a lawyer.'
      ],
      whatNotToSay: [
        'Don\'t admit guilt or fault',
        'Don\'t argue or resist',
        'Don\'t consent to searches',
        'Don\'t provide information beyond required documents'
      ],
      keyRights: [
        'Right to remain silent',
        'Right to refuse consent to search',
        'Right to ask if you\'re free to go',
        'Right to an attorney'
      ]
    }
  },
  {
    id: 'police-questioning',
    title: 'Police Questioning',
    description: 'Being questioned by officers',
    icon: '👮',
    scripts: {
      whatToSay: [
        'I am invoking my Fifth Amendment right to remain silent.',
        'I want to speak to a lawyer before answering questions.',
        'Am I under arrest or am I free to go?',
        'I do not consent to any searches.'
      ],
      whatNotToSay: [
        'Don\'t answer questions without a lawyer',
        'Don\'t make statements about your activities',
        'Don\'t try to explain or justify anything',
        'Don\'t consent to searches'
      ],
      keyRights: [
        'Fifth Amendment right against self-incrimination',
        'Right to an attorney',
        'Right to know if you\'re under arrest',
        'Right to refuse consent to search'
      ]
    }
  },
  {
    id: 'home-search',
    title: 'Home Search',
    description: 'Police at your door',
    icon: '🏠',
    scripts: {
      whatToSay: [
        'I do not consent to a search.',
        'Do you have a warrant?',
        'I am exercising my right to remain silent.',
        'I want to speak to a lawyer.'
      ],
      whatNotToSay: [
        'Don\'t let them in without a warrant',
        'Don\'t consent to searches',
        'Don\'t answer questions about who lives there',
        'Don\'t provide information about others'
      ],
      keyRights: [
        'Fourth Amendment protection against unreasonable searches',
        'Right to see a warrant',
        'Right to refuse consent',
        'Right to remain silent'
      ]
    }
  }
];

export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];

export const EMERGENCY_MESSAGES = {
  default: "🚨 EMERGENCY: I may need assistance. My location and time are attached. Please check on me if you don't hear from me soon.",
  traffic: "🚗 I've been pulled over by police. Location and time attached. Will update you soon.",
  questioning: "👮 I'm being questioned by police. Location attached. May need legal assistance.",
  home: "🏠 Police are at my location. Time and address attached. Please be aware of my situation."
};
