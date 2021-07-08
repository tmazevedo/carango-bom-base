const correctFields = [
  { name: 'field-1', label: 'field 1' },
  { name: 'field-2', label: 'field 2', componentType: 'textfield' },
  {
    name: 'field-3',
    label: 'field 3',
    componentType: 'select',
    options: [
      { name: 'a', id: 1 },
      { name: 'b' },
    ],
  },
  { name: 'field-4', label: 'field 4', type: 'password' },
  { name: 'field-5', label: 'field 5', type: 'email' },
  {
    name: 'field-6',
    label: 'field 6',
    componentType: 'select',
    options: [
      { name: 'c', id: 1 },
      { name: 'd' },
    ],
  },
];

const correctMainButton = {
  text: 'main button',
  onSubmit: () => {},
};

const correctSecondaryButton = {
  text: 'secondary button',
  onSubmit: () => {},
};

export {
  correctFields,
  correctMainButton,
  correctSecondaryButton,
};
