import { ScenarioOption } from './types';

export const LEGAL_SCENARIOS: ScenarioOption[] = [
  {
    id: 'traffic_stop',
    title: 'Traffic Stop',
    description: 'Pulled over by police',
    icon: '🚗',
    urgency: 'high'
  },
  {
    id: 'questioning',
    title: 'Police Questioning',
    description: 'Being questioned by officers',
    icon: '❓',
    urgency: 'high'
  },
  {
    id: 'search_request',
    title: 'Search Request',
    description: 'Officer wants to search you/property',
    icon: '🔍',
    urgency: 'high'
  },
  {
    id: 'arrest',
    title: 'Arrest Situation',
    description: 'Being arrested or detained',
    icon: '⚖️',
    urgency: 'high'
  },
  {
    id: 'general_rights',
    title: 'Know Your Rights',
    description: 'General legal rights information',
    icon: '📋',
    urgency: 'low'
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

export const EMERGENCY_ALERT_TEMPLATE = {
  subject: '🚨 Emergency Alert from Pocket Justice',
  message: (name: string, location: string) => 
    `${name} has activated an emergency alert. Location: ${location}. Time: ${new Date().toLocaleString()}. This is an automated message from Pocket Justice app.`
};

export const SAMPLE_LEGAL_CONTENT = {
  traffic_stop: {
    title: 'Traffic Stop Rights',
    script: `Stay calm and keep your hands visible. You have the right to:
    
• Remain silent beyond providing license, registration, and insurance
• Refuse consent to search your vehicle
• Ask "Am I free to leave?" if not under arrest
• Record the interaction (where legal)

Say: "I'm exercising my right to remain silent. I do not consent to any searches."`,
    summary: 'During a traffic stop, you must provide required documents but can remain silent and refuse searches.'
  },
  questioning: {
    title: 'Police Questioning Rights',
    script: `You have the right to:
    
• Remain completely silent
• Ask for a lawyer
• Leave if you're not being detained
• Record the interaction (in public spaces)

Say: "I'm exercising my right to remain silent. I want to speak to a lawyer. Am I free to leave?"`,
    summary: 'You can remain silent during police questioning and ask for a lawyer at any time.'
  },
  search_request: {
    title: 'Search Request Rights',
    script: `When asked to consent to a search, you have the right to:
    
• Refuse consent to search your person, belongings, or property
• Ask if you're being detained or if you're free to leave
• Remain silent during the interaction
• Request to see a warrant if they claim to have one

Say: "I do not consent to any searches. Am I being detained or am I free to leave?"`,
    summary: 'You can refuse consent to searches and ask if you are being detained.'
  },
  arrest: {
    title: 'Arrest Situation Rights',
    script: `If you are being arrested, you have the right to:
    
• Remain silent (anything you say can be used against you)
• Ask for a lawyer immediately
• Refuse to answer questions without a lawyer present
• Make one phone call (in most jurisdictions)

Say: "I'm exercising my right to remain silent. I want to speak to a lawyer."`,
    summary: 'During an arrest, remain silent and immediately request a lawyer.'
  },
  general_rights: {
    title: 'General Legal Rights',
    script: `Your fundamental rights during police encounters:
    
• Right to remain silent (5th Amendment)
• Right to refuse consent to searches (4th Amendment)
• Right to ask if you're free to leave
• Right to record police interactions (in public spaces)
• Right to a lawyer if arrested

Remember: Stay calm, be respectful, but know your rights.`,
    summary: 'Know your constitutional rights during any police encounter.'
  }
};
