import {TitleCasePipe} from "./TitleCasePipe"
let pipe = new TitleCasePipe();
describe('TitleCasePipe', () => {
  it('abc to ABC', () => expect(pipe.transform("abc")).toBe("ABC"));
});
