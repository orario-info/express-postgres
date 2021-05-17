const request = require("supertest");
const app = require("../app");

// --------------------------------------------------------------
describe("1.Successful Pattern", () => {
  test("1-1.GET ルートケース /", done => {
    request(app)
      .get("/")
      .then(response => {
        //HTTPレスポンスステータスコード
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("1-2.GET メモ取得ケース /memos/2", done => {
    request(app)
      .get("/memos/2")
      .then(response => {
        //HTTPレスポンスステータスコード
        expect(response.statusCode).toBe(200);
        //取得データの件数の設定内容確認
        expect(response.body.length).toBe(1);
        expect(response.body[0].idmemo).toBe("2");
        expect(response.body[0].title).toBe("打合せ予定");
        expect(response.body[0].note).toBe("パワポ資料の用意");
        done();
      });
  });
});

// --------------------------------------------------------------
describe("2.Exception Pattern", () => {
  test("2-1 GET メモ取得 該当なしケース /memos/9", done => {
    request(app)
      .get("/memos/9")
      .then(response => {
        //HTTPレスポンスステータスコード
        expect(response.statusCode).toBe(500);
        //取得データの設定内容確認
        expect(response.body).toBe("No Data");
        done();
      });
  });

  test("2-2 GET メモ取得 文字パラメータケース /memos/A", done => {
    request(app)
      .get("/memos/A")
      .then(response => {
        //HTTPレスポンスステータスコード
        expect(response.statusCode).toBe(500);
        //取得データの設定内容確認
        expect(response.body).toBe("DB Error");
      });
    done();
  });
});