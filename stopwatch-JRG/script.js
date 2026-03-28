/**
 * Stopwatch and Countdown - JRG
 * script.js  —  all application logic
 *
 * Modules:  SW (stopwatch)  |  CD (countdown input)  |  CDR (countdown run)
 * Navigation: goTo(n) slides the #slider-wrapper to screen index n (0-3).
 */
(function () {
  'use strict';

  /* ── UTILITIES ───────────────────────────────────────────── */
  function pad2(n) { return String(Math.floor(n)).padStart(2, '0'); }
  function pad3(n) { return String(Math.floor(n)).padStart(3, '0'); }

  function msToHMSms(ms) {
    var safe = Math.max(0, Math.floor(ms));
    var totalSec = Math.floor(safe / 1000);
    return {
      hms : pad2(Math.floor(totalSec / 3600)) + ':' +
            pad2(Math.floor((totalSec % 3600) / 60)) + ':' +
            pad2(totalSec % 60),
      ms3 : pad3(safe % 1000)
    };
  }

  /* ── SCREEN NAVIGATION ───────────────────────────────────── */
  var SCREEN = { MAIN: 0, STOPWATCH: 1, COUNTDOWN: 2, COUNTDOWN_RUN: 3 };
  var slider = document.getElementById('slider-wrapper');

  function goTo(idx) {
    slider.style.transform = 'translateX(-' + (idx * 25) + '%)';
  }

  document.getElementById('btn-go-stopwatch').addEventListener('click', function () {
    SW.reset(); goTo(SCREEN.STOPWATCH);
  });
  document.getElementById('btn-go-countdown').addEventListener('click', function () {
    CD.reset(); goTo(SCREEN.COUNTDOWN);
  });
  document.getElementById('btn-back-sw').addEventListener('click', function () {
    SW.stop(); goTo(SCREEN.MAIN);
  });
  document.getElementById('btn-back-cd').addEventListener('click', function () {
    goTo(SCREEN.MAIN);
  });
  document.getElementById('btn-back-cdr').addEventListener('click', function () {
    CDR.stop(); goTo(SCREEN.COUNTDOWN);
  });

  /* ── STOPWATCH MODULE ────────────────────────────────────── */
  var SW = (function () {
    var ivl       = null;
    var elapsed   = 0;
    var startedAt = 0;
    var running   = false;

    var hmsEl    = document.getElementById('sw-hms');
    var msEl     = document.getElementById('sw-ms');
    var startBtn = document.getElementById('sw-start-btn');
    var clearBtn = document.getElementById('sw-clear-btn');

    function render(ms) {
      var t = msToHMSms(ms);
      hmsEl.textContent = t.hms;
      msEl.textContent  = t.ms3;
    }

    function tick() {
      render(elapsed + (Date.now() - startedAt));
    }

    function start() {
      startedAt = Date.now();
      running   = true;
      ivl       = setInterval(tick, 30);
      startBtn.textContent = 'Pause';
      startBtn.className   = 'action-btn green-btn';
    }

    function pause() {
      clearInterval(ivl); ivl = null;
      elapsed  += Date.now() - startedAt;
      running   = false;
      startBtn.textContent = 'Continue';
      startBtn.className   = 'action-btn continue-btn';
    }

    function stop() {
      clearInterval(ivl); ivl = null;
      running = false;
    }

    function reset() {
      stop();
      elapsed = 0;
      render(0);
      startBtn.textContent = 'Start';
      startBtn.className   = 'action-btn green-btn';
    }

    startBtn.addEventListener('click', function () {
      var lbl = startBtn.textContent;
      if (lbl === 'Start' || lbl === 'Continue') { start(); }
      else if (lbl === 'Pause')                  { pause(); }
    });

    clearBtn.addEventListener('click', reset);

    return { stop: stop, reset: reset };
  }());

  /* ── COUNTDOWN INPUT MODULE ──────────────────────────────── */
  var CD = (function () {
    /* Slots: [H1, H2, M1, M2, S1, S2]  right-shift on every digit press */
    var digits = [0, 0, 0, 0, 0, 0];

    var hmsEl = document.getElementById('cd-hms');
    var msEl  = document.getElementById('cd-ms');

    function render() {
      var d = digits;
      hmsEl.textContent =
        d[0] + '' + d[1] + ':' + d[2] + '' + d[3] + ':' + d[4] + '' + d[5];
      msEl.textContent = '000';
    }

    function pushDigit(n) {
      digits.shift();
      digits.push(n);
      render();
    }

    function reset() {
      digits = [0, 0, 0, 0, 0, 0];
      render();
    }

    /* Bind digit buttons */
    document.querySelectorAll('.num-btn[data-digit]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        pushDigit(parseInt(btn.getAttribute('data-digit'), 10));
      });
    });

    /* Clear button */
    document.getElementById('cd-clear-btn').addEventListener('click', reset);

    /* Set button */
    document.getElementById('cd-set-btn').addEventListener('click', function () {
      var d = digits;
      var h = d[0] * 10 + d[1];
      var m = d[2] * 10 + d[3];
      var s = d[4] * 10 + d[5];

      if (h === 0 && m === 0 && s === 0) { return; }   /* refuse 00:00:00 */
      if (m >= 60 || s >= 60) {
        alert('Invalid time: minutes and seconds must each be less than 60.');
        return;
      }

      CDR.load((h * 3600 + m * 60 + s) * 1000);
      goTo(SCREEN.COUNTDOWN_RUN);
    });

    render(); /* initialise display */
    return { reset: reset };
  }());

  /* ── COUNTDOWN RUN MODULE ────────────────────────────────── */
  var CDR = (function () {
    var ivl       = null;
    var remaining = 0;
    var lastTick  = 0;
    var running   = false;

    var hmsEl    = document.getElementById('cdr-hms');
    var msEl     = document.getElementById('cdr-ms');
    var startBtn = document.getElementById('cdr-start-btn');
    var clearBtn = document.getElementById('cdr-clear-btn');

    function render(ms) {
      var t = msToHMSms(ms);
      hmsEl.textContent = t.hms;
      msEl.textContent  = t.ms3;
    }

    function load(totalMs) {
      stop();
      remaining = totalMs;
      render(remaining);
      startBtn.textContent = 'Start';
      startBtn.className   = 'action-btn green-btn';
    }

    function tick() {
      var now    = Date.now();
      remaining  = Math.max(0, remaining - (now - lastTick));
      lastTick   = now;
      render(remaining);
      if (remaining <= 0) {
        stop();
        startBtn.textContent = 'Start';
        startBtn.className   = 'action-btn green-btn';
      }
    }

    function play() {
      lastTick  = Date.now();
      running   = true;
      ivl       = setInterval(tick, 30);
      startBtn.textContent = 'Pause';
      startBtn.className   = 'action-btn green-btn';
    }

    function pause() {
      clearInterval(ivl); ivl = null;
      running = false;
      startBtn.textContent = 'Continue';
      startBtn.className   = 'action-btn continue-btn';
    }

    function stop() {
      clearInterval(ivl); ivl = null;
      running = false;
    }

    startBtn.addEventListener('click', function () {
      if (remaining <= 0) { return; }
      var lbl = startBtn.textContent;
      if (lbl === 'Start' || lbl === 'Continue') { play();  }
      else if (lbl === 'Pause')                  { pause(); }
    });

    clearBtn.addEventListener('click', function () {
      stop();
      remaining = 0;
      render(0);
      startBtn.textContent = 'Start';
      startBtn.className   = 'action-btn green-btn';
    });

    return { load: load, stop: stop };
  }());

}());
