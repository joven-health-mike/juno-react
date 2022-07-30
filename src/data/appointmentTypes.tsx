// Copyright 2022 Social Fabric, LLC

import React from 'react';

export type Type = {
  _id: number;
  name: string;
  color: string;
};

export const emptyType = {
  _id: -1,
  name: '',
  color: '',
};

export const exampleTypes = [
  {
    _id: 0,
    name: 'Clinical',
    color: 'green',
  },
  {
    _id: 1,
    name: 'Consultation',
    color: 'blue',
  },
  {
    _id: 2,
    name: 'Evaluation',
    color: 'red',
  },
];

export type ITypesContext = {
  types: Type[];
  setTypes: (types: Type[]) => void;
};

export const TypesContext = React.createContext<ITypesContext>({
  types: exampleTypes,
  setTypes: () => {},
});
