export const createRenderer = jest.fn(() => ({ renderRule: jest.fn((fn, props) => 'className') }))
export const combineRules = jest.fn(() => () => { })
