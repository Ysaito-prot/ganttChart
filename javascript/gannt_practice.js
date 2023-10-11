$(function () {
  // クリックした行の「作業名」要素を格納
  let selectedItem = "";

  // 課題1「複数選択行の入れ替え(ライブラリの利用)」
  $("#column_table_body")
    .selectable({
      cancel: ".ui-selected",
      selected: function (e, ui) {
        // 選択中の行の「作業名」要素を格納
        selectedItem = $(".ui-selected").children("td:nth-child(2)");
      },
    })
    .sortable({
      axis: "y",
      items: "> tr",
      helper: function (e, item) {
        let selected_all = item.parent().children(".ui-selected").clone();
        item.data("multidrag", selected_all).siblings(".ui-selected").remove();
        return $("<tr/>").append(selected_all);
      },
      stop: function (e, ui) {
        let selected = ui.item.data("multidrag");
        ui.item.after(selected);
        ui.item.remove();
        // 選択色解除
        selected.removeClass("ui-selected");
        $(selected).children("td").removeClass("ui-selected");
      },
    });
  
  // 課題2「インデント機能」
  // インデント幅の定義
  const indentW = 12;
  // →ボタンの処理
  $("#indent_right").on("click", function () {
    if (selectedItem != "") {
      let indent = parseInt($(selectedItem).css("text-indent")) + indentW;
      if (indent <= indentW * 3)
        $(selectedItem).css("text-indent", indent + "px");
    }
  });
  // ←ボタンの処理
  $("#indent_left").on("click", function () {
    if (selectedItem != "") {
      let indent = parseInt($(selectedItem).css("text-indent")) - indentW;
      if (0 <= indent) $(selectedItem).css("text-indent", indent + "px");
    }
  });

  // 課題3「日数計算」
  let planStDateInpt = "";
  let planEdDateInpt = "";
  let actStDateInpt = "";
  let actEdDateInpt = "";

  $(".planSt, .planEd, .actSt, .actEd").on('change', function () {
     // 選択された日付取得
    planStDateInpt = $(this).closest(".wrapper").find(".planSt").val().replaceAll( '-', '/' );
    planEdDateInpt = $(this).closest(".wrapper").find(".planEd").val().replaceAll('-', '/');
    actStDateInpt = $(this).closest(".wrapper").find(".actSt").val().replaceAll( '-', '/' );
    actEdDateInpt = $(this).closest(".wrapper").find(".actEd").val().replaceAll('-', '/');
    let planStDay = new Date(planStDateInpt);
    let planEdDay = new Date(planEdDateInpt);
    let actStDay = new Date(actStDateInpt);
    let actEdDay = new Date(actEdDateInpt);
    // 選択された行の日数セル取得
    planDayOutpt = $(this).closest(".wrapper").find(".planDif");
    actDayOutpt = $(this).closest(".wrapper").find(".actDif");
    //差日を求める（86,400,000ミリ秒＝１日）
    if (planStDateInpt !== "" && planEdDateInpt !== "") {
      planDayOutpt.text((planEdDay - planStDay) / 86400000);
    }
    if (actStDateInpt !== "" && actEdDateInpt !== "") {
      actDayOutpt.text((actEdDay - actStDay) / 86400000);
    }
  })
});
