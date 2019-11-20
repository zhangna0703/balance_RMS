<template>
  <div class="DataTreewrap">
    <Navslide></Navslide>
    <div class="DataTreebox">
     <Exitnav></Exitnav>
      <div class="twobox">
        <dl>
          <dt>教练：</dt>
          <dd>{{trainer}} <span>人</span> </dd>
        </dl>
        <dl>
          <dt>运动员：</dt>
          <dd>{{runner}}<span>人</span></dd>
        </dl>
      </div>
      <div class="DataTreebottom">
          <h3>运动数据统计</h3>
          <div class="healthone">
              <div class="healthleft">
                <div class="sport">
                <h3>动感平衡台运动时间统计</h3>
                <el-select v-model="value" placeholder="请选择" @change='select' style="width:100px">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
              </div>
                <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
              </div>
            <div class="healthRight">
              <h3>运动员运动时间排行</h3>
              <ul>
                <li v-for='(item,index) in rankList'><p><span class="num">{{index+1}}</span> <span>{{item.username}}</span></p> <span>{{item.times}}分钟</span></li>
              </ul>
            </div>
          </div>
      </div>
      
    </div>
  </div>
</template>

<script>
  import Navslide from '@/components/navslide.vue'
  import Exitnav from '@/components/exitnav.vue'
  import { chartStatistics,peopleCounting,rank } from '@/api/index'

  export default {
    name: 'DataTree',
    components: {
      Navslide,
      Exitnav
    },
    data() {
      return {
        num:0,
        rankList:[],
        dataList:[],
        trainer: 0,
        runner: 0,
        options: [{
          value: '选项1',
          label: '2019'
        }, {
          value: '选项2',
          label: '2020'
        }, {
          value: '选项3',
          label: '2021'
        }, {
          value: '选项4',
          label: '2022'
        }, {
          value: '选项5',
          label: '2023'
        }],
        value: '2019'
      }
    },
    mounted(){
        this.drawLine();
        this.getrank();
        this.getpeopleCount();
    },
    methods: {
      getrank(){
        rank().then((res)=>{
          this.rankList = res.data.data
        })
      },
      select(){
        this.drawLine(this.value);
        console.log(this.value)
        // chartStatistics({year:this.value}).then((res) => {
        //   this.dataList = res.data.data
        // })
      },
      getpeopleCount(){
        peopleCounting().then((res)=>{
          this.trainer = res.data.data.trainer
          this.runner = res.data.data.runner
        })
      },
      async drawLine(value) {
        await chartStatistics({year:value}).then((res) => {
          this.dataList = res.data.data
        })
          .catch((err) => {
            console.log(err)
          })
        var echarts = require('echarts');
        var myChart = echarts.init(document.getElementById('myChart'));
        myChart.setOption({
          color: ['rgb(52, 64, 88)'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '运动时长',
              type: 'bar',
              barWidth: '40%',
              data: this.dataList
            }
          ]
        });
      }
    }
  }
</script>
<style scoped>
  html,body{
    width: 100%;
    height: 100%;
    overflow:auto
  }
  .DataTreewrap {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .sport{
    display: flex;
    justify-content: space-between;
    padding-right: 30px;
    box-sizing: border-box;
  }
  .el-menu-vertical-demo {
    width: 250px;
    height: 100%;
  }

  .DataTreebox {
    background: #f2f2f2;
    width: 100%;
    height: 100%;
  }
  .num{
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #3C4044;
    background: rgba(240,242,245,1);
    border-radius: 50%;
  }

  .DataTreebox h3 {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    box-sizing: border-box;
    border-bottom: solid 1px #E7E8EF;
    font-size:16px;
font-family:PingFangSC-Medium,PingFang SC;
font-weight:500;
color:rgba(101,107,113,1);
  }
.DataTreebottom{
  /* height: 460px; */
  background: #fff;
  margin: 20px;
  box-sizing: border-box;
  box-shadow:0px 1px 2px 0px rgba(0,21,41,0.12);
  border-radius:2px;
  border:1px solid rgba(230,235,239,1);
}
.healthone{
  display: flex;
  padding: 20px 50px 20px 20px;
  box-sizing: border-box;
  justify-content: space-between;
}
.healthleft{
  width: 70%;
}
.healthleft h3{
  height: 48px;
  line-height: 48px;
  font-size: 16px;
  font-weight: 100;
  border: 0;
}
.healthRight{
  flex: 1;
}
.healthRight h3{
  font-size: 18px;
  padding: 0;
  font-weight: 100;
  border: 0;
}
.healthRight ul{
  display: flex;
  flex-direction: column;
}
.healthRight ul li{
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
}
.healthRight ul li p{
  display: flex;
}
.healthRight ul li span{
  margin-right: 10px;
}
  .twobox {
    display: flex;
    margin: 30px 0 30px 20px;
  }

  .twobox dl {
    width:240px;
    height:176px;
    background:rgba(255,255,255,1);
    box-shadow:0px 1px 2px 0px rgba(0,21,41,0.12);
    border-radius:2px;
    border:1px solid rgba(230,235,239,1);
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }

  .twobox dl dt {
    font-size:14px;
font-family:PingFangSC-Medium,PingFang SC;
font-weight:500;
color:rgba(101,107,113,1);
  }

  .twobox dl dd {
    flex: 1;
    display: flex;
    align-items: baseline;
    justify-content: center;
    font-size:46px;
    margin-top: 30px;
font-family:HelveticaNeue-Medium,HelveticaNeue;
font-weight:500;
color:rgba(60,64,68,1);
  }

  .twobox dl dd span {
    margin-left: 5px;
    font-size:18px;
font-family:PingFangSC-Regular,PingFang SC;
font-weight:400;
color:rgba(92,99,105,1);
  }
</style>