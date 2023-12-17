import { Constants as C } from "./constants.js";
import { PreloaderScenes, PreloaderAudio, PreloaderAnimations, PreloaderApp } from "./preloaderApp.js";

Hooks.once('ready', async function() {

    // Scenes settings menu register
    game.settings.registerMenu(C.ID, game.i18n.localize(`${C.ID}.settings.scenes.settingName`), {
        name: game.i18n.localize(`${C.ID}.settings.scenes.name`),
        label: game.i18n.localize(`${C.ID}.settings.scenes.label`),
        hint: game.i18n.localize(`${C.ID}.settings.scenes.hint`),
        type: PreloaderScenes,
        restricted: true
    });

    // Audio settings menu register
    game.settings.registerMenu(C.ID, game.i18n.localize(`${C.ID}.settings.audio.settingName`), {
        name: game.i18n.localize(`${C.ID}.settings.audio.name`),
        label: game.i18n.localize(`${C.ID}.settings.audio.label`),
        hint: game.i18n.localize(`${C.ID}.settings.audio.hint`),
        type: PreloaderAudio,
        restricted: true
    });

    // Animations settings menu register
    game.settings.registerMenu(C.ID, game.i18n.localize(`${C.ID}.settings.animations.settingName`), {
        name: game.i18n.localize(`${C.ID}.settings.animations.name`),
        label: game.i18n.localize(`${C.ID}.settings.animations.label`),
        hint: game.i18n.localize(`${C.ID}.settings.animations.hint`),
        type: PreloaderAnimations,
        restricted: true
    });

    // Register global settings - array of scene ids for preloading
    game.settings.register(C.ID, "scenesBuffer", {
        name: "scenesBuffer",
        scope: "world",
        config: false,
        type: Array,
        default: []
    });

    // Register global settings - array of audio paths for preloading
    game.settings.register(C.ID, "audioBuffer", {
        name: "audioBuffer",
        scope: "world",
        config: false,
        type: Array,
        default: []
    });

    // Register global settings - array of animation paths for preloading
    game.settings.register(C.ID, "animationsBuffer", {
        name: "animationsBuffer",
        scope: "world",
        config: false,
        type: Array,
        default: []
    });

    // Register global module functions
    globalThis[C.API_ID] = {
        getScenesToPreload: PreloaderApp.getScenesToPreload,
        addScenesToPreload: PreloaderApp.addScenesToPreload,
        deleteScenesToPreload: PreloaderApp.deleteScenesToPreload,
        getAudioToPreload: PreloaderApp.getAudioToPreload,
        addAudioToPreload: PreloaderApp.addAudioToPreload,
        deleteAudioToPreload: PreloaderApp.deleteAudioToPreload,
    };

    // + register global module functions for sequencer, if sequencer is active
    if (game.modules.get("sequencer")?.active) {
        globalThis[C.API_ID] = { 
            ...globalThis[C.API_ID],
            getAnimationsToPreload: PreloaderApp.getAnimationsToPreload,
            addAnimationsToPreload: PreloaderApp.addAnimationsToPreload,
            deleteAnimationsToPreload: PreloaderApp.deleteAnimationsToPreload
        }
    }

    // Preload scenes
    let sceneShowError = true
    for (let sceneId of game.settings.get(C.ID, "scenesBuffer")) {
        if (game.scenes.get(sceneId)) {
            await game.scenes.preload(sceneId, true)
        } else {
            if (sceneShowError) {
                sceneShowError = false
                ui.notifications.error(game.i18n.localize(`${C.ID}.error.scenes.uiError`));
                console.log(game.i18n.localize(`${C.ID}.error.scenes.consoleText1`))
                console.log(game.i18n.localize(`${C.ID}.error.scenes.consoleText2`))
                console.log(game.i18n.localize(`${C.ID}.error.scenes.consoleText3`))
            }
            console.log(game.i18n.localize(`${C.ID}.error.scenes.consoleText4-1`), sceneId, game.i18n.localize(`${C.ID}.error.scenes.consoleText4-2`))
        }
    }

    // Preload audio
    let audioShowError = true
    for (let sound of game.settings.get(C.ID, "audioBuffer")) {
        if (await srcExists(sound)) {
            await AudioHelper.preloadSound(sound)
        } else {
            if (audioShowError) {
                audioShowError = false
                ui.notifications.error(game.i18n.localize(`${C.ID}.error.audio.uiError`));
                console.log(game.i18n.localize(`${C.ID}.error.audio.consoleText1`))
                console.log(game.i18n.localize(`${C.ID}.error.audio.consoleText2`))
                console.log(game.i18n.localize(`${C.ID}.error.audio.consoleText3`))
            }
            console.log(game.i18n.localize(`${C.ID}.error.audio.consoleText4-1`), sound, game.i18n.localize(`${C.ID}.error.audio.consoleText4-2`))
        }
    }
});

Hooks.once("sequencerEffectManagerReady", async () => {
    // preload animations (and other files), if sequencer is active
    if (game.modules.get("sequencer")?.active) {
        const animations = game.settings.get(C.ID, "animationsBuffer")

        try {
            await Sequencer.Preloader.preload(animations, true)
        } catch (error) {
            ui.notifications.error(game.i18n.localize(`${C.ID}.error.sequencer.uiError`));
            console.log(game.i18n.localize(`${C.ID}.error.sequencer.consoleText1`))
            console.log(game.i18n.localize(`${C.ID}.error.sequencer.consoleText2`))
            console.log(game.i18n.localize(`${C.ID}.error.sequencer.consoleText3`))
        }
    }  
})