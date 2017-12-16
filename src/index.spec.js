import { A } from './index';

describe("sample", function() {
  it("should be of a stock", function() {
    const a = new A('test');
    expect(a.say()).toBe('test');
  });

  it("should be hello!", function() {
    const a = new A('test');
    expect(a.hello()).toBe('hello');
  });
});
