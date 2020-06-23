/**
 * XMLHttpRequest constructor 
 * Request to the provide Url
 */
class Xhr {
    /**
     * 
     * @param {String} url 
     * @param {function} success 
     * @param {function} failed 
     * @param {string} method 
     * @param {boolean} async 
     */
    constructor(url, success, failed, method ="GET", async= true){
      
        this.url = url;
        this.method = method;
        this.async = async;
        this.req  = new XMLHttpRequest();
        this.req.open(this.method, this.url, this.async);
        this.req.send(null)
        this.req.onload = event => this.getData(event,success, failed);
        
    }

    getData(event, success, failed) {
        console.log(event.target.status)
        // On teste directement le status de notre instance de XMLHttpRequest
        if (this.req.status === 200) {
            try {
                success(JSON.parse(this.req.responseText));
            }
            catch (e){
                failed(e.message);
            } 
            // Tout baigne, voici le contenu de la réponse
            console.log("Contenu", this.req.responseText);
        } else {
            // On y est pas encore, voici le statut actuel
            console.log("Statut actuel", this.req.status, this.req.statusText);
        }
    }
}



export default Xhr;