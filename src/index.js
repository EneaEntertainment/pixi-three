import Main from 'scripts/main';

if (document.readyState === 'complete')
{
    start();
}
else
{
    document.addEventListener('DOMContentLoaded', start, false);
}

function start()
{
    // eslint-disable-next-line no-new
    new Main();
}
