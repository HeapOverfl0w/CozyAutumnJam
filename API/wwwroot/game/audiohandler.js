class AudioHandler {
    constructor() {
        const volume = 0.2;
        const musicVolume = 0.1;
        this.music = document.getElementById("hellacioushilltops");
        this.music.volume = musicVolume;

        this.music1 = document.getElementById("mediocremall");
        this.music1.volume = musicVolume;

        this.click = document.getElementById("click");
        this.click.volume = volume;

        this.woodhammer = document.getElementById("woodhammer");
        this.woodhammer.volume = volume;

        this.musicList = [this.music, this.music1];
        this.currentSong = 0;
        this.muted = true

        if (!this.muted) {
            this.toggleMute();
        }
    }

    startup() {
        if (!this.muted) {
            this.playAndLoopMusic();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        document.querySelectorAll("audio").forEach( (elem) => 
        {
            elem.muted = this.muted; 
        });
        if (!this.muted) {
            this.playAndLoopMusic();
        } else {
            this.stopMusic();
        }
    }

    update() {
        if (this.musicList[this.currentSong].ended) {
            this.playAndLoopMusic();
        }
    }

    playAndLoopMusic() {
        this.currentSong++;
        if (this.currentSong >= this.musicList.length)
            this.currentSong = 0;

        this.musicList[this.currentSong].currentTime = 0;
        this.musicList[this.currentSong].play();
    }

    stopMusic() {
        this.musicList[this.currentSong].pause();
        this.musicList[this.currentSong].currentTime = 0;
    } 
    
    playClick() {
        this.click.currentTime = 0;
        this.click.play();
    }

    playWoodHammer() {
        this.woodhammer.currentTime = 0;
        this.woodhammer.play();
    }

    playAudio(src) {
        let audioCopy = new Audio();
        audioCopy.src = src;
        audioCopy.play();
    }
  
}