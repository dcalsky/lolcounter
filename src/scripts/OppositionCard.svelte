<div class="opposition-card">
    <div>
        <div>英雄: <b>{opposition.title}-{opposition.zh_name}</b></div>
        <div>{champion.zh_name}的胜率: <b>{(win_rate*100).toFixed(2)}%</b></div>
        <div>游戏场次: {times}</div>
    </div>

    <div class="avatar">
        <img src={`https://game.gtimg.cn/images/lol/act/img/champion/${opposition.name[0].toUpperCase()}${opposition.name.slice(1)}.png`}
             alt="">
    </div>
</div>

<script>
    export let champion;
    export let opposition;
    export let win_rate;
    export let times;
</script>

<style lang="scss">
    .avatar {
        img {
            border-radius: 5px;
            height: 100%;
            max-height: 80px;
        }
    }

    .opposition-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, .1), 0 0 0 1px rgba(10, 10, 10, .02);
        color: #666666;
        background: #ffffff;
        border-radius: 5px;
        margin: 15px 0;
        text-align: left;
        padding: 10px;
        line-height: 1.6;
    }
</style>