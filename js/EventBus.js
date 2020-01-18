class EventBus
{
    constructor()
    {
        this.subscribers = {};
    }

    subscribe(eventName, subscriber)
    {
        if (typeof this.subscribers[eventName] === 'undefined'){
            this.subscribers[eventName] = [];
        } 
        this.subscribers[eventName].push(subscriber);
    }

    publish(eventName, data=null)
    {
        let allSubscribers = this.subscribers[eventName];
        allSubscribers.forEach((element, index) => {
            element(data);
        });
    }
}