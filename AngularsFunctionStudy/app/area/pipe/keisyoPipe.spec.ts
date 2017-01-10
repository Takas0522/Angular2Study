import { KeisyoPipe, KeisyoType } from "./keisyoPipe";
describe("敬称Pipeテスト", () => {
    let pipe: KeisyoPipe;
    beforeEach(() => {
        pipe = new KeisyoPipe();
    });
    it("「ちゃん」テスト", ()=> {
        var result = pipe.transform("A", KeisyoType.chan);
        expect(result).toEqual("Aちゃん");
    });
    it("「さま」テスト", ()=> {
        var result = pipe.transform("A", KeisyoType.sama);
        expect(result).toEqual("Aさま");
    });
    it("「さん」テスト", ()=> {
        var result = pipe.transform("A", KeisyoType.san);
        expect(result).toEqual("Aさん");
    });
    it("「野郎」テスト", ()=> {
        var result = pipe.transform("A", KeisyoType.yarou);
        expect(result).toEqual("A野郎！");
    });
    it("例外テスト", ()=> {
        var result = pipe.transform("A", 0);
        expect(result).toEqual("A!?");
    });
});