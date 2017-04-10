window.onload = function( ) {

    var audio = document.getElementById('audio'),// 音乐
    sourceList = audio.getElementsByTagName('source'),// 音乐列表
    play = document.getElementById('play'),// play
    prev = document.getElementById('prev'),// prev
    next = document.getElementById('next'),// next
    jingyin = document.getElementById('mute'), // 静音
	voiceBar = document.getElementById('voice-bar'), // 音量调节
	musicBar = document.getElementById('music-bar'), // 播放进度控制
	playedBar = document.getElementById('played-bar'), // 已播放进度条
	voicedBar = document.getElementById('voiced-bar'), // 已播放音乐条
	musicTitle = document.getElementById('title'), // 音乐标题
	loadBar = document.getElementById('load-bar'), // 加载进度条
	currentTime = document.getElementById('current-time'), // 当前音乐时间
	totalTime = document.getElementById('total-time'), // 当前音乐时间
	musicImg = document.getElementById('music-img'), // 音乐封面
	xunhuan = document.getElementById('xunhuan'); // 循环按钮
	currentSrcIndex = 0;


	// 是否循环播放 
	audio.loop = false;

	// 是否自动播放
	audio.autoplay = false;

	//初始化音量
	audio.volume = 0.5;
	var voicedBarWidth = (audio.volume / 1) * voiceBar.clientWidth;
	voicedBar.style.width = voicedBarWidth + 'px';

	// 显示第一首歌曲时长
	(function () {
		var fen = parseInt(audio.duration / 60);
		var miao = parseInt(audio.duration % 60);
		if (miao < 10) {
			miao = '0'+miao;
		}
		totalTime.innerHTML = fen + ':' + miao;
	})();

	// 播放 暂停
	play.onclick = function () {
        if (audio.paused) {
			audio.play();
			this.innerHTML = 'Pause';
			musicImg.style.animation = 'xuanzhuan 5s linear infinite';
		} else {
			audio.pause();
			this.innerHTML = 'Play';
			musicImg.removeAttribute('style');
		}
		musicTime();
	};

	// 上一曲
	prev.onclick = function () {
		changeMusic('prev');
	};

	// 下一曲
	next.onclick = function () {
		changeMusic('next');
	};

	// 切换歌曲
	function changeMusic (direct) {
		if (direct === 'next') {
			++ currentSrcIndex > sourceList.length - 1 && (currentSrcIndex = 0); // next music
		}
		else {
			-- currentSrcIndex < 0 && (currentSrcIndex = sourceList.length - 1); //prev music
 		}
		currentSrc = sourceList[currentSrcIndex].getAttribute('src');
		currentImg = sourceList[currentSrcIndex].getAttribute('data-img');
		musicTitle.innerHTML = sourceList[currentSrcIndex].title;
		musicImg.setAttribute('src',currentImg);
		audio.setAttribute('src',currentSrc);
		audio.play();
		play.innerHTML = 'Pause';
		musicImg.style.animation = 'xuanzhuan 5s liner infinite';
		musicTime;
	}

	// 音量调节（增加黄色现在音量显示）
	voiceBar.onclick = function (event) {
		var voiceBarWidth = voiceBar.clientWidth;
		var newVolume = (event.offsetX / voiceBarWidth);
		audio.volume = newVolume;

		// 音量大小更新
		var voicedBarWidth = (audio.volume / 1) * voiceBarWidth;
		voicedBar.style.width = voicedBarWidth + 'px';
	};

	// 播放进度控制
	musicBar.onclick = function (event) {
		var musicBarWidth = musicBar.clientWidth;
		var newCurrentTime = (event.offsetX / musicBarWidth) * audio.duration;
		audio.currentTime = newCurrentTime;
		var playedBarWidth = (audio.currentTime / audio.duration) * musicBarWidth;
		playedBar.style.width = playedBarWidth + 'px';
	};

	// 播放进度实时更新(修改为歌曲播放时开启定时器，暂停和页面load时清除定时器)
	setInterval(function updatePlayedBar (){
		var musicBarWidth = musicBar.clientWidth;
		var playedBarWidth = (audio.currentTime / audio.duration) * musicBarWidth;
		playedBar.style.width = playedBarWidth + 'px';
		if (audio.currentTime % 60 < 10) {
			currentTime.innerHTML = parseInt(audio.currentTime / 60) + ':0' + parseInt(audio.currentTime % 60);
		} else {
			currentTime.innerHTML = parseInt(audio.currentTime / 60) + ':' + parseInt(audio.currentTime % 60);
		}
		//如果是时间结束，并且是非单曲循环，自动下一曲
		if (audio.currentTime === audio.duration && !audio.loop) {
			next.onclick();
		}
	}, 1000);

	// 静音
	jingyin.onclick = function () {
		if (!audio.muted) {
			audio.muted = true;
			voicedBar.style.width = 0 +'px';
		}else {
			audio.muted = false;
			var voiceBarWidth = voiceBar.clientWidth;

			// 音量大小更新
			var voicedBarWidth = (audio.volume / 1) * voiceBarWidth;
			voicedBar.style.width = voicedBarWidth + 'px';
		}
	};

	// 是否单曲循环
	xunhuan.onclick = function () {
		if (audio.loop) {
			audio.loop = false;
			this.innerHTML = '循环';
		} else {
			audio.loop = true;
			this.innerHTML = '单曲';
		}
	};

	// 计算音乐时间
	function musicTime() {
		// 更换播放歌曲
		musicTitle.innerHTML = sourceList[currentSrcIndex].title;
		// 播放时间显示
		audio.addEventListener("canplay", function(){
			var sc=audio.duration;
			var fen = parseInt(sc / 60);
			var miao = parseInt(sc % 60);
			if (miao < 10) {
				totalTime.innerHTML = fen + ':0' + miao;
			}else {
				totalTime.innerHTML = fen + ':' + miao;
			}
		});
	};

	

	
}
