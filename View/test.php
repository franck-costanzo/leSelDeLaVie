<main>
    <form action="#" method="POST">
        <label for="supaTXT" id="supaTXTlabel" class="importantLabel">Le label du texte : </label>
        <input type="text" name="supaTXT" id="supaTXT" value="text value">

        <label for="supaTXTAREA" id="supaTXTAREAlabel"  class="importantLabel">Le label du textarea : </label>
        <textarea name="supaTXTAREA" id="supaTXTAREA" cols="30" rows="10">Text area innerHTML</textarea>

        <fieldset>
            <legend  class="importantLabel">Select a maintenance drone:</legend>

            <div>
            <input type="radio" id="huey" name="drone" value="huey"
                    checked>
            <label for="huey">Huey</label>
            </div>

            <div>
            <input type="radio" id="dewey" name="drone" value="dewey">
            <label for="dewey">Dewey</label>
            </div>

            <div>
            <input type="radio" id="louie" name="drone" value="louie">
            <label for="louie">Louie</label>
            </div>
        </fieldset>

        <fieldset>
            <legend  class="importantLabel">Choose your monster's features:</legend>

            <div>
            <input type="checkbox" id="scales" name="scales"
                    checked>
            <label for="scales">Scales</label>
            </div>

            <div>
            <input type="checkbox" id="horns" name="horns">
            <label for="horns">Horns</label>
            </div>
        </fieldset>

        <label for="pet-select"  class="importantLabel">Choose a pet:</label>
        <select name="pets" id="pet-select">
            <option value="">--Please choose an option--</option>
            <option value="dog">Dog</option>
            <option value="cat" selected>Cat</option>
            <option value="hamster">Hamster</option>
            <option value="parrot">Parrot</option>
            <option value="spider">Spider</option>
            <option value="goldfish">Goldfish</option>
        </select>

        <label for="image_url" id="labelimg">Le label de l'image : </label>
        <input type="file" name="image_url" id="image_url">
        <input type="submit" value="submit" name="genPdf">
    </form>
</main>