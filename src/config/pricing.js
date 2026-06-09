export const PRICING = {
  india: {
    currency: '₹',
    symbol: 'INR',
    tiers: {
      basic: { price: 999, label: 'Basic', paymentLink: '#' },
      pro:   { price: 1999, label: 'Pro', paymentLink: '#' },
      extreme: { price: 3499, label: 'Extreme', paymentLink: '#' },
    }
  },
  international: {
    currency: '$',
    symbol: 'USD',
    tiers: {
      basic: { price: 19, label: 'Basic', paymentLink: '#' },
      pro:   { price: 39, label: 'Pro', paymentLink: '#' },
      extreme: { price: 69, label: 'Extreme', paymentLink: '#' },
    }
  }
};
