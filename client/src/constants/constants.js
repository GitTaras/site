const options = {
  Name: {
    purpose: [
      { value: 'Company', label: 'Company' },
      { value: 'Product', label: 'Product' },
      { value: 'Project', label: 'Project' },
    ],
    style: ['Classic', 'Fun', 'Professional', 'Descriptive', 'Youthful', 'Any'],
  },
  Logo: {
    style: ['Techy', 'Fun', 'Fancy', 'Brick & Mortar', 'Photo-based'],
  },
  Tagline: {
    style: ['Classic', 'Fun', 'Powerful', 'Descriptive', 'Modern', 'Any'],
  },
  industry: [
    { value: 'Activity', label: 'Activity' },
    { value: 'Advertising', label: 'Advertising' },
    { value: 'Art', label: 'Art' },
    { value: 'Beauty', label: 'Beauty' },
    { value: 'Book', label: 'Book' },
    { value: 'Education', label: 'Education' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Home', label: 'Home' },
    { value: 'Kids', label: 'Kids' },
    { value: 'Media', label: 'Media' },
    { value: 'Restaurants', label: 'Restaurants' },
    { value: 'Wedding', label: 'Wedding' },
  ],
  types: [
    { value: 'Name', label: 'Name' },
    { value: 'Logo', label: 'Logo' },
    { value: 'Tagline', label: 'Tagline' },
  ],
  sum: 100,
};

export default options;
