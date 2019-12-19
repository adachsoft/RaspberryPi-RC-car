class Meters
{
    constructor()
    {
        this.meterSpeed = null;
        this.meterTurn = null;
        this.meterTemp = null;
        $(document).ready(()=> {
            this.init();
        });
    }

    init()
    {
        this.meterSpeed = new JustGage({
            id: 'meterEnginePower',
            value: 0,
            title: 'engine power',
            label: "engine power",
            symbol: '%',
            defaults: this.getDefaultsMeter(),
        });
          
        this.meterTurn = new JustGage({
            id: 'meterTurnStrength',
            value: 0,
            title: 'turn strength',
            label: "turn strength",
            symbol: '%',
            defaults: this.getDefaultsMeter()
        });

        this.meterTemp = new JustGage({
            id: 'meterTemp',
            value: 0,
            title: 'temp cpu',
            label: "temp cpu",
            symbol: 'C',
        });

        $('#current_speed').on('change', (e)=>{
            this.meterSpeed.refresh(-1 * $(e.currentTarget).val());
        });

        $('#current_turn').on('change', (e)=>{
            this.meterTurn.refresh(1 * $(e.currentTarget).val());
        });
    }

    getDefaultsMeter()
    {
        return {
            min: -100,
            max: 100,
            minTxt: "min",
            maxTxt: "max",
            donut: false,
            gaugeWidthScale: 0.6,
            counter: true,
            hideInnerShadow: true,
            pointer: true,
            pointerOptions: {
                toplength: 5,
                bottomlength: 15,
                bottomwidth: 2
            },
            startAnimationTime: 200,
            refreshAnimationTime: 200,
            levelColors: [
                "#99ff33",
                "#ffff66",
                "#ff3300"
              ]
          }
    }

    meterTempRefresh(value)
    {
        this.meterTemp.refresh(value);
    }
}