/**
 * Created by yyszsq on 2017/4/3.
 */



$(function () {
    $('#btn').click(function () {
        // alert('小强老湿，你再点一次试试');

        $('.log_ss').toggle();
    });
    $('#back').click(function () {
        history.go(-1);
    })
});
