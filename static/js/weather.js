function WeatherData(stationName=[]) {
    this.stationName = stationName;
    // AirPressure 氣壓
    // AirTemperature 氣溫 
    // DailyHigh 當日最高溫
    // DailyLow 當日最低溫
    // PeakGustSpeed 最大瞬間風風速
    // Precipitation 當日降水量
    // RelativeHumidity 相對濕度
    // Weather 天氣現象
    // WindDirection 平均風風向
    // WindSpeed 平均風風速
    this.AirPressure = 0;
    this.AirTemperature = 0;
    this.DailyHigh = 0;
    this.DailyLow = 0;
    this.PeakGustSpeed = 0;
    this.Precipitation = 0;
    this.RelativeHumidity = 0;
    this.Weather = 0;
    this.WindDirection = 0;
    this.WindSpeed = 0;
    this.ObsTime = 0;
    this.LastQueryTime = 0;
    this.GetServerData();
}
WeatherData.prototype.GetServerData = function(){
    this.LastQueryTime = Date.now();
    let url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=CWA-DEB7E776-FDBF-4EEC-8F66-C8E9FB1BEF80&format=JSON&StationName=`;
    for(let i=0;i<this.stationName.length;i++){
        url += encodeURI(this.stationName[i]);
        if(i==this.stationName.length-1) break;
        url +=',';
    }
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        context: this,
    })
    .done(function(data) {
        console.log(data);
        // console.log(data.records.Station);
        // $('#wind-speed-text').text(`${data['success']}m/s`);
        $('#wind-speed-text').text(`2352345m/s`);
        for(let i=data.records.Station.length-1;i>=0;i--){
            this.ObsTime = data.records.Station[i].ObsTime.DateTime;
            let target = data.records.Station[i].WeatherElement;
            // this.AirPressure = target.AirPressure;
            if(this.AirTemperature==0 || this.AirTemperature==-99.0) this.AirTemperature = target.AirTemperature;
            // this.DailyHigh = target.DailyExtreme.DailyHigh.TemperatureInfo.AirTemperature;
            // this.DailyLow = target.DailyExtreme.DailyLow.TemperatureInfo.AirTemperature;
            // this.PeakGustSpeed = target.GustInfo.PeakGustSpeed;
            // this.Precipitation = target.Now.Precipitation;
            if(this.RelativeHumidity==0 || this.RelativeHumidity==-99) this.RelativeHumidity = target.RelativeHumidity;
            // this.Weather = target.Weather;
            // this.WindDirection = target.WindDirection;
            if(this.WindSpeed==0 || this.WindSpeed==-99.0) this.WindSpeed = target.WindSpeed;
            this.LogWeatherData();
        }
        
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
        $('#wind-speed-text').text(`FFFF`);
    });
};
WeatherData.prototype.LogWeatherData = function(){
    console.log(`ObsTime:${this.ObsTime}`);
    // console.log(`AirPressure:${this.AirPressure}`);
    console.log(`AirTemperature:${this.AirTemperature}`);
    // console.log(`DailyHigh:${this.DailyHigh}`);
    // console.log(`DailyLow:${this.DailyLow}`);
    // console.log(`PeakGustSpeed:${this.PeakGustSpeed}`);
    // console.log(`Precipitation:${this.Precipitation}`);
    console.log(`RelativeHumidity:${this.RelativeHumidity}`);
    // console.log(`Weather:${this.Weather}`);
    // console.log(`WindDirection:${this.WindDirection}`);
    console.log(`WindSpeed:${this.WindSpeed}`);
};
WeatherData.prototype.GetData = function(){
    let AirTemperature = 0;
    let RelativeHumidity = 0;
    let WindSpeed = 0;
    if(this.LastQueryTime!=0 && (Date.now()-this.LastQueryTime)/1000>30*60){
        console.log('UpdateData');
        this.GetServerData();
    }
    else{
        if(this.AirTemperature!=0){
            AirTemperature = this.GetRandomFloat(this.AirTemperature-0.1, this.AirTemperature+0.1);
            RelativeHumidity = this.GetRandomFloat(this.RelativeHumidity-0.1, this.RelativeHumidity+0.1);
            WindSpeed = this.GetRandomFloat(this.WindSpeed, this.WindSpeed+2);
        }
    }
    return {
        'AirTemperature': AirTemperature,
        'RelativeHumidity':RelativeHumidity,
        'WindSpeed':WindSpeed,
    }
};
WeatherData.prototype.GetRandomFloat = function(min, max){
    let r = (Math.random() * (max - min) + min).toFixed(2); 
    return parseFloat(r);
};
