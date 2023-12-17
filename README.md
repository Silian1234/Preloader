<h1><strong>Preloader</strong></h1>
<p>Tired of preloading the same scene over and over again every time players rejoin?<br>This module will allow you to select scenes that players will preload every time they join the server, which will speed up the game, especially if you frequently reuse one or more scenes!</p>
<p>In addition, you can select audio files, and if you have Sequencer installed, animations that will be preloaded as well as scenes.</p>
<p>Due to the peculiarities of FoundryVTT, long tracks cannot be preloaded, but preloading will be especially useful for sounds that require strict timings, such as the sound of dice rolling, the sound of a weapon attack, and so on.</p>
<h2><strong>Usage</strong></h2>
<p>You can find the Preloader settings menu in the game settings.</p>
![a](https://imgur.com/aTpNMED)
<p>Clicking one of the buttons will open the corresponding preload window. </p>
![Foundry_Virtual_Tabletop_wJG3B1UKVG](https://github.com/JabaNazgob/Preloader/assets/8327536/38b9ab6b-6b70-4b5d-903b-d31c093c66c7)
<p>Here you can add and remove scenes, audio files, or animations that players will preload when entering the world.</p>
<hr>
<p><strong>Adding</strong> content for preloading through the Preloader window depends on the type of content:</p>
<ul>
    <li>
        <p><strong>Scenes:</strong> you can drag a scene from the navigation field at the top of the screen, from the scenes tab, or in similar ways into the input field. If this scene is not yet in the list, it will be added. In addition, you can write the <strong>id </strong>of the scene in the input field and press "Enter", in which case, similarly, if this scene is not yet in the list, it will be added.</p>
    </li>
    <li>
        <p><strong>Audio:</strong> in order to add audio files to the preload list you need to write its full path, including the name and extension of the file, starting from the root folder of the host "<strong>../FoundryVTT/Data/</strong>", then press "Enter". If this file is not yet in the list, it will be added. For example, if you want to preload the file <strong>SwordAttackSound1.wav </strong> located at "<strong>../FoundryVTT/Data/weaponSoundEffects/</strong>", you must write in the input field "<strong>weaponSoundEffects/SwordAttackSound1.wav</strong>" and press "Enter".</p>
    </li>
    <li>
        <p><strong>Animations (requires Sequencer module): </strong>you can add media files by writing their path in the same way as for the <strong>audio preload</strong> window. In addition, instead of a path, you can specify the Database Path of the animation loaded in the <strong>Sequencer</strong> database, which you can get through the <strong>Sequencer Manager</strong> window.</p>
    </li>
</ul>
<p>The content added in the preload window will look like a salad-green node with the name of the scene or file path.</p>
![Foundry_Virtual_Tabletop_dA9HxHrpWV](https://github.com/JabaNazgob/Preloader/assets/8327536/2772a1fa-ed11-4291-8380-2aa537ad4b59)
<p>After you have added the necessary content to the preload window, you need to click the "Save" button to <strong>confirm</strong> the changes. As long as there is at least 1 added scene/file in the window, the "Save" button will light up salad-green. Also, you can undo the changes made by clicking the "Cancel" button, in which case any changes that you made to the preload window will be cancelled, which will be useful for cases when you accidentally delete a file with a long path, which you don't even remember.</p>
<p>You can click on the cross in the right part of the node to <strong>remove </strong>content from the preload window. This change will also only be applied after clicking the "Save" button.</p>
<h2><strong>Export/Import</strong></h2>
<p>If you have, say, several certain sets of frequently used scenes for different cities or locations, instead of manually removing several temporarily unnecessary scenes from the preload window, and adding new ones, only to return everything back in a few sessions, you can save the list of content for preloading as a JSON file. To do this, click the <strong>"Import to JSON"</strong> button, and choose the folder where you want to save this file. Later, by clicking the <strong>"Export from JSON"</strong> button, you can add the list of content saved in the JSON file to the preload window, while the content already in the preload window will not be removed. The added content will be considered new, and you will need to click the "Confirm" button as usual to apply the changes. </p>
<p>You can also freely edit the list of content inside the JSON file itself.</p>
<h2><strong>API</strong></h2>

