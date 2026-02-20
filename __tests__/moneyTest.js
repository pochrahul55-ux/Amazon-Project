import { formatCurrency } from "../scripts/utils/money.js";

describe('test suite: formatCurrency', () => {
  it ('Should convert cents to dollars', () => {
    expect(formatCurrency(1090)).toEqual('10.90');
  });

  it ('Should work with zero', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it ('Should round up to nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it ('Should round down to nearest cent', () =>{
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });

  it ('Should work with negative number', () =>{
    expect(formatCurrency(-1)).toEqual('-0.01');
  });
});