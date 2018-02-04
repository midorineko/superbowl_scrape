var http = require( 'http' );

url = 'http://www.nfl.com/liveupdate/scores/scores.json';
last_home_score = {};
last_away_score = {};
setInterval(function(){ 
	http.get(url, res => {
	  res.setEncoding("utf8");
	  let body = "";
	  res.on("data", data => {
	    body += data;
	  });
	  res.on("end", () => {
	    body = JSON.parse(body);
	    home = body['2018020400']['home'];
	    away = body['2018020400']['away'];
	    home_score = home.score;
	    away_score = away.score;
	    console.log("NE: ", home_score);
	    console.log("PHI: ", away_score);
	    console.log("Down: ", body['2018020400']['down']);
	    console.log("Redzone: ", body['2018020400']['redzone']);
	    if(JSON.stringify(away_score) != JSON.stringify(last_away_score)){
	    	console.log("Score EAGLES!")
	    }else if(JSON.stringify(last_home_score) != JSON.stringify(home_score)){
			 console.log("Score PATRIOTS!")
	    }else if(body['2018020400']['redzone']){
	    	console.log("Redzone")
	    }else if(body['2018020400']['down'] == 4){
	    	console.log("Fourth Down")
	    }
	    last_away_score = away_score;
	    last_home_score = home_score;		
	  });
	});
}, 1000);
