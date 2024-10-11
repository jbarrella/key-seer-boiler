export const plans = [
  {
    name: 'Free',
    price: { month: '$0', annual: '$0' },
    features: [
      '5 uses of lookup or breakdown per day',
      'Max. 5 keywords per lookup',
      'Basic analytics',
    ],
    limitations: ['No interest by region', 'No priority support'],
  },
  {
    name: 'Standard',
    price: { month: '$4.95', annual: '$4.25' },
    features: [
      '100 uses of lookup or breakdown per day',
      'Max. 50 keywords per lookup',
      'See interest by region',
      'Advanced analytics',
    ],
    limitations: ['No priority support'],
  },
  {
    name: 'Pro',
    price: { month: '$19.95', annual: '$16.95' },
    features: ['Unlimited use', 'Max. 1,000 keywords per lookup', 'Priority support'],
  },
];
