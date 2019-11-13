<template>
  <div class="DataTreewrap">
    <Navslide></Navslide>
    <div class="DataTreebox">
      <div class="navbox">欢迎您，管理员</div>
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
                <h3>healthone系统运动时间统计</h3>
                <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
              </div>
            <div class="healthRight">
              <h3>运动员运动时间排行</h3>
              <ul>
                <li><p><span class="num">1</span> <span>张明明</span></p> <span>322分钟</span>  </li>
                <li><p><span class="num">2</span> <span>李明明</span></p> <span>32分钟</span>  </li>
              </ul>
            </div>
          </div>
      </div>
      
    </div>
  </div>
</template>

<script>
  import Navslide from '@/components/navslide.vue'
  import { chartStatistics,peopleCounting } from '@/api/index'

  export default {
    name: 'DataTree',
    components: {
      Navslide
    },
    data() {
      return {
        dataList:[],
        trainer: 0,
        runner: 0
      }
    },
    mounted(){
        this.drawLine();
        this.getpeopleCount();
    },
    methods: {
      getpeopleCount(){
        peopleCounting().then((res)=>{
          this.trainer = res.data.data.trainer
          this.runner = res.data.data.runner
        })
      },
      async drawLine() {
        await chartStatistics().then((res) => {
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
  .DataTreewrap {
    display: flex;
    width: 100%;
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
    color: #fff;
    background: rgb(52, 64, 88);
    border-radius: 50%;
  }
  .navbox {
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: flex-end;
    background: #fff;
    padding-right: 20px;
    box-sizing: border-box;
  }

  .DataTreebox h3 {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    box-sizing: border-box;
    border-bottom: solid 1px #ccc;
  }
.DataTreebottom{
  background: #fff;
  margin: 20px;
  padding: 20px;
  box-sizing: border-box;
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
  font-size: 18px;
  font-weight: 100;
  border: 0;
}
.healthRight{
  flex: 1;
}
.healthRight h3{
  font-size: 18px;
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
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 150px;
    padding: 20px;
    box-sizing: border-box;
    border: solid 1px #ccc;
    background: #fff;
    margin-right: 20px;
  }

  .twobox dl dt {
    font-weight: 800;
    font-size: 18px;
  }

  .twobox dl dd {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: 800;
  }

  .twobox dl dd span {
    font-size: 14px;
    font-weight: 200;
    margin-left: 5px;
  }
</style>