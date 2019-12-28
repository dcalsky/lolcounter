<div class="container">
    <div class="tool">
        <div class="header">
            <img class="logo" src={LOGO} alt="LOGO">
            <h1 class="title">LOL Counter 大师</h1>
            <h2 class="desc">为你的对线保驾护航</h2>
        </div>

        <div class="generate-box">
            <div class="themed-select">
                <Select {loadOptions}
                        optionIdentifier="name"
                        noOptionsMessage="搜不到该英雄"
                        {getSelectionLabel}
                        {getOptionLabel}
                        on:select={onSelectChampion}
                        on:clear={onClearChampion}
                        bind:selectedValue
                        placeholder="输入对方的英雄名称"
                />
            </div>
            <div>
                <button class="readme" on:click={showReadme}>
                    使用说明
                </button>
            </div>
        </div>
    </div>

    {#if showCounter}
        <Tabs>
            <TabList>
                <Tab><span style="color: #66BB6A">克制他</span></Tab>
                <Tab><span style="color: #666666">一般</span></Tab>
                <Tab><span style="color: #FF7043">被他克制</span></Tab>
            </TabList>

            <TabPanel>
                <ul>
                    {#each counters['weak'] as item}
                        <li>
                            <OppositionCard champion={selectedValue} opposition={item.opposition}
                                            win_rate={item.win_rate} times={item.times}/>
                        </li>
                    {/each}
                </ul>
            </TabPanel>

            <TabPanel>
                <ul>
                    {#each counters['equal'] as item}
                        <li>
                            <OppositionCard champion={selectedValue} opposition={item.opposition}
                                            win_rate={item.win_rate} times={item.times}/>
                        </li>
                    {/each}
                </ul>
            </TabPanel>

            <TabPanel>
                <ul>
                    {#each counters['strong'] as item}
                        <li>
                            <OppositionCard champion={selectedValue} opposition={item.opposition}
                                            win_rate={item.win_rate} times={item.times}/>
                        </li>
                    {/each}
                </ul>
            </TabPanel>
        </Tabs>
    {/if}

    {#if loadingCounters}
        加载对战信息中...
    {/if}

    <footer>
        <p class="tip">1. 胜率不代表一切</p>
        <p class="tip">2. 数据来源: <b>韩服白金分段</b>以上的记录</p>
        <p class="tip">3. 本开源项目请勿用于任何商业用途</p>
        <p class="tip" style="margin: 15px 0;"><a class="tip" href="mailto:zzkia@noddl.me"
                                                  style="margin: 0 5px; text-decoration-line: underline">联系我</a>沪ICP备15027189号-2
        </p>
        <a class="github-button" href="https://github.com/dcalsky/lolcounter" data-icon="octicon-star" data-size="large"
           data-show-count="true" aria-label="Star dcalsky/lolcounter on GitHub">Star</a>
    </footer>
</div>


<script>
    import Select from 'svelte-select';
    import OppositionCard from './OppositionCard.svelte'
    import {Tabs, Tab, TabList, TabPanel} from 'svelte-tabs';
    import axios from 'axios';
    import {URL, LOGO} from './constants'

    const debounceTime = 700;
    let selectedValue = undefined;
    let showCounter = false;
    let finished = false;
    let processing = false;
    let counters = {};
    let loadingCounters = false;
    let searchLock = false;
    const defaultChampions = [
        {name: 'yasuo', zh_name: '亚索', title: '疾风剑豪'},
    ];
    const showReadme = () => {
        alert('输入英雄名称，然后查看Counter情况。');
    };
    const getSelectionLabel = (option) => `${option.title} - ${option.zh_name}`;
    const getOptionLabel = (option) => `${option.title} - ${option.zh_name}`;
    const loadOptions = (keyword) => {
        if (searchLock || !keyword) return Promise.resolve([]);
        searchLock = true;
        setTimeout(() => {
            searchLock = false;
        }, debounceTime);
        return new Promise(resolve => {
            axios.get(`${URL}/lolcounter/champions?search=${keyword}`).then(res => {
                resolve(res.data)
            })
        })
    };
    const onSelectChampion = (e) => {
        const champion = e.detail;
        getChampionCounters(champion.name)
    };
    const onClearChampion = () => {
        showCounter = false;
    };
    const getChampionCounters = (name) => {
        loadingCounters = true;
        axios.get(`${URL}/lolcounter/champions/${name}/counters/`).then(res => {
            counters = res.data;
            showCounter = counters.hasOwnProperty('strong');
            if (!showCounter) {
                alert("暂无该英雄的数据！");
            }
        }).catch(_ => {
            alert("获取数据失败，请重试！");
        }).finally(_ => {
            loadingCounters = false;
        })
    };

</script>


<style lang="scss">
    .themed-select {
        --border: 2px solid #2979FF;
        --borderRadius: 8px;
        margin: 20px 0;
    }

    .container {
        text-align: center;
        max-width: 900px;
        margin: 0 auto;
        padding: 0 10px;
    }

    .logo {
        height: 55px;
        width: 55px;
    }

    .generate-box {
        margin-top: 10px;
    }


    .readme {
        $image: #EF9A9A;
        border: 1px solid $image;

        &:hover {
            background: $image;
            color: white;
        }
    }


    button {
        cursor: pointer;
        outline: none;
        border: none;
    }

    * {
        box-sizing: inherit;
    }

    ul {
        padding: 0;
        margin: 0;
        list-style: none;
    }


    .header {
        margin-bottom: 20px;
    }

    .title {
        margin: 5px 0;
        font-size: 2rem;
        color: #666666;
    }

    .desc {
        font-size: 1.2rem;
        color: #9bc788;
        margin: 5px 0;
    }

    .tool {
        padding-bottom: 10px;
    }


    .tip {
        font-size: 14px;
        font-family: "Roboto", Arial, sans-serif;
        color: rgba(0, 0, 0, 0.44);
    }

    footer {
        margin-top: 30px;
    }


</style>