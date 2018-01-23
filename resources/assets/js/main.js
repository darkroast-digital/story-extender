// *************************************************************************
// *************************************************************************
// *************************************************************************



require('./bootstrap');




// #VIDEO PLAYER
// =========================================================================

var videoPlayer = document.querySelector('.videoPlayer');

if (videoPlayer) {

    var video = videoPlayer.querySelector('video');
    var play = videoPlayer.querySelector('.videoPlayerPlay');
    var mute = videoPlayer.querySelector('.videoPlayerMute');
    var progress = videoPlayer.querySelector('.videoProgress');
    var progressBar = videoPlayer.querySelector('.videoProgressBar');

    video.controls = false;

    play.addEventListener('click', () => {
        if (video.paused || video.ended) {
            videoPlayer.classList.add('is-playing');
            video.play();
        } else {
            videoPlayer.classList.remove('is-playing');
            video.pause();
        }
    });

    video.addEventListener('loadedmetadata', function() {
       progress.setAttribute('max', video.duration);
    });

    video.addEventListener('timeupdate', function() {
        if (!progress.getAttribute('max')) {
            progress.setAttribute('max', video.duration);
        }
        progress.value = video.currentTime;
        progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
    });

    // mute.addEventListener('click', () => {
    //     video.muted = true;
    // });

}




// #MODAL
// =========================================================================

var modalTrigger = document.querySelectorAll('.modalTrigger');
var modal = document.querySelectorAll('.modal');
var overlay = document.querySelector('.overlay');

modalTrigger.forEach((trigger) => {

    trigger.addEventListener('click', function(e) {
        e.preventDefault();

        var thisModal = this.dataset.modal;

        modal.forEach((modal) => {
            if (modal.dataset.modal == thisModal) {
                overlay.classList.add('overlay-active');
                document.querySelector('.modal[data-modal="' + thisModal + '"]').classList.add('modal-open');
            }
        })
    });
});

overlay.addEventListener('click', function() {
    this.classList.remove('overlay-active');
    modal.forEach((modal) => {
        modal.classList.remove('modal-open');
    })
});

document.addEventListener('keydown', function(e) {

    if (e.which == 27) {
        modal.forEach((modal) => {
            modal.classList.remove('modal-open');
        })
        overlay.classList.remove('overlay-active');
    }

});




// #UPLOAD
// =========================================================================

var upload = document.querySelector('.upload');
var uploadBG = document.querySelector('.uploadBg');
var uploadTrigger = document.querySelector('[data-upload]');

if (uploadBG) {

    uploadTrigger.addEventListener('click', function() {
        uploadBG.classList.add('is-open');
    });

}




// #FORM
// =========================================================================

var form = $('.uploadForm');
var uploadInput = $('.upload input');

var dropzone  = document.querySelector('.upload');
var droppedFile = false

dropzone.addEventListener('dragover', function(e) {
  e.preventDefault();
});

dropzone.addEventListener('drop', function(e) {
  e.preventDefault();
  
  droppedFile = e.dataTransfer.files[0];
  var reader = new FileReader();

  form.submit();

    $('.upload').replaceWith(`
        <a href="#0" class="upload">
            <span class="uploadIconContainer is-animating">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <g class="uploadIcon">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                    </g>
                </svg>
            </span>
            <span class="uploadInput"><em>Files are</em><span><br>processing!</span><small>This may take a minute.</small></span>
        </a>
    `);
});

uploadInput.on('change', function() {

    form.submit();

    $('.upload').replaceWith(`
        <a href="#0" class="upload">
            <span class="uploadIconContainer is-animating">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                    <g class="uploadIcon">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                    </g>
                </svg>
            </span>
            <span class="uploadInput"><em>Files are</em><span><br>processing!</span><br><small>This may take a minute.</small></span>
        </a>
    `);

});

$(form).submit(function(e) {
    e.preventDefault();

    var formData = new FormData($(this)[0]);

    if (droppedFile) {

        formData.append('image', droppedFile)

    } 

    $('.uploadModal').addClass('upload-started');

    $.ajax({
        type: 'post',
        url: $(this).attr('action'),
        data: formData,
        processData: false,
        contentType : false,
    })
    .done(function (response) {
        var hash = response;

        $('input').val('');
        $('textarea').val('');

        $('.upload').replaceWith(`
            <a href="/assets/videos/${ response }/video.mp4" download class="upload">
                    <span class="uploadIconContainer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                            <g class="uploadIcon">
                                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z"></path>
                            </g>
                        </svg>
                    </span>
                    <span class="uploadInput"><span>Download</span> <br><em>Your Video</em></span>
                </a>
            `);

        $('.upload').after('<a href="#0" class="button uploadNag">Upload Another?</a>');

        console.log('Success: ' + response);
    })
    .fail(function (data) {
        $('input').val('');
        $('textarea').val('');
        $('<div class="alert success">Oh no!  Something went wrong, try again.</div>').insertAfter(form);

        console.log('Fail: ' + data);
    });
});

document.querySelector('body').addEventListener('click', function(e) {
    console.log();

    if (e.target.classList.contains('uploadNag')) {
        $('.upload').replaceWith(`
            <label class="upload">
                <span class="uploadIconContainer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                        <g class="uploadIcon">
                            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path>
                        </g>
                    </svg>
                </span>
                <span class="uploadInput"><span>Drop your files</span> <br>or click to <em>add</em></span>
                <input type="file" name="image" accept="image/*;capture=camera">
            </label>
        `);
    }
});
