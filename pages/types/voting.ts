export type Candidate =
  | 'Augustine'
  | 'Kosisochukwu';


export const candidates: Candidate[] = [
  'Augustine',
  'Kosisochukwu'
];


export const voters = [
  'Stephanie',
  'Rita',
  'James',
  'Peter',
  'Victor',
  'Anthony',
  'Charles',
  'Augustine',
  'Lillian',
  'Gabriel',
  'Christopher',
  'Kosisochukwu',
  'Bonaventure',
  'Abigail',
  'David',
  'Amarachi',
  'Loveth',
  'Chidimma',
  'Ifeanyi',
  'Majesty',
] as const;


export type Voter =
  typeof voters[number];


export type Poll = {
  Augustine: number;
  Kosisochukwu: number;
};