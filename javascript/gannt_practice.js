$(function () {
  // 課題1「複数選択行の入れ替え(ライブラリの利用)」
  $("#column_table_body")
    .selectable({
      cancel: ".ui-selected",
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
        selected.removeClass('ui-selected');
	      $(selected).children("td").removeClass('ui-selected');
      },
    });
  // 課題2「インデント機能」
});
