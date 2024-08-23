class Music {
    constructor(path, title, desc) {
        this.path = path
        this.title = title
        this.desc = desc
    }
}

var musics = [
    new Music("Musics/Cave.mp3", "Cave", "This music was made in 4 days for the “AAAAAAAh” game.\nI used chiptune and bla bla bla..."),
    new Music("Musics/Desert1.mp3", "Desert1", "Music for Desert"),
    new Music("Musics/Desert2.mp3", "Desert2", "bla bla bla..."),
    new Music("Musics/Desert3.mp3", "Desert3", "bla bla bla..."),
    new Music("Musics/Desert4.mp3", "Desert4", "bla bla bla..."),
    new Music("Musics/Desert5.mp3", "Desert5", "bla bla bla..."),
    new Music("Musics/Desert6.mp3", "Desert6", "bla bla bla..."),
    new Music("Musics/Dungeon.mp3", "Dungeon", "bla bla bla..."),
    new Music("Musics/EDM.wav", "EDM", "bla bla bla..."),
    new Music("Musics/Electro swing.mp3", "Electro Swing", "bla bla bla..."),
    new Music("Musics/Forest.mp3", "Forest", "bla bla bla..."),
    new Music("Musics/Jungle.mp3", "Jungle", "bla bla bla..."),
    new Music("Musics/Mystic Cave.mp3", "Mystic Cave", "bla bla bla..."),
    new Music("Musics/pizza.mp3", "Pizza", "bla bla bla..."),
    new Music("Musics/Sparkle.mp3", "Sparkle", "bla bla bla..."),
    new Music("Musics/Synth wavy.mp3", "Synth wavy", "bla bla bla..."),
    new Music("Musics/trailer 3.mp3", "Trailer 3", "bla bla bla..."),
    new Music("Musics/Trailer 4.wav", "Trailer 4", "bla bla bla..."),
    new Music("Musics/Whistle.mp3", "Whistle", "bla bla bla..."),
]

var current_music = 0
var music_sec = 0
var music_length = 0
var music_playing = false

var song = document.getElementById("audio_controls")
var progress = document.getElementById("music_slider")

const music_player = Vue.createApp({
    data() {
        return {
            music_path: musics[current_music].path,
            music_title: musics[current_music].title,
            music_desc: musics[current_music].desc,
            
            music_sec: music_sec,
            music_length: music_length,
            music_playing: music_playing,
        }
    },
    methods : {
        updateCurrentMusic(){
            document.getElementById("audio_source").src = ""
            this.music_path = musics[current_music].path
            this.music_title = musics[current_music].title
            this.music_desc = musics[current_music].desc  
            
            document.getElementById("audio_source").src = this.music_path
            song.load()
            if (this.music_playing) {
                song.play()
            }
        },
        nextMusic() {
            current_music += 1
            if (current_music >= musics.length) {
                current_music = 0
            }
            this.updateCurrentMusic()
        },
        prevMusic() {
            current_music -= 1
            if (current_music <= -1) {
                current_music = musics.length - 1
            }
            this.updateCurrentMusic()
        },
        toggleMusic() {
            if (song.paused) {
                song.play()
            } else {
                song.pause()
            }
            this.music_playing = !song.paused
        },
        updateTimeData() {
            this.music_sec = TimeFormat(song.currentTime)
            this.music_length = TimeFormat(song.duration)
        },
    },
    created() {
        window.addEventListener("DOMContentLoaded", (e)=>{
            song = document.getElementById("audio_controls")
            this.updateCurrentMusic()
            song.addEventListener("loadedmetadata", (e)=>{
                document.getElementById("music_slider").value = song.currentTime
                document.getElementById("music_slider").max = song.duration
                this.updateTimeData()
            })
            
            song.addEventListener("timeupdate", (e) => {
                document.getElementById("music_slider").value = song.currentTime
                this.music_playing = !song.paused
                this.updateTimeData()
            })
    
            document.getElementById("music_slider").addEventListener("input", (e) => {
                progress = document.getElementById("music_slider")
                song.pause()
                var seek = song.duration * (progress.value / progress.max)
                song.currentTime = seek
                song.play()
                this.updateTimeData()
            })

        })
    },
})

music_player.mount("#music_player")

function TimeFormat(seconds) {
    minutes = Math.trunc(seconds / 60)
    new_seconds = seconds - (minutes * 60)
    if (Math.round(new_seconds) >= 10) {
        return Math.round(minutes).toString() + ":" + Math.round(new_seconds).toString()
    } else {
        return Math.round(minutes).toString() + ":0" + Math.round(new_seconds).toString()
    }
}