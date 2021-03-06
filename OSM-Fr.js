var carte1,carte3,KML1,myMap,projection;                   //variables globales, utilisée par tout le programme
  
function init(){                                         //fonction d'initialisation des variables globales, lancée après que le body soit chargé
	
projection = ol.proj.get('EPSG:3857');
    	

	carte3 = new ol.layer.Tile(
    		{
		title: 'Carte OSM-Fr',
		type: 'base',
		source: new ol.source.OSM({ 
    		url: 'https://{a-c}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png' 
   		}) 
		}); 
		
	carte1 = new ol.layer.Tile({
		title: 'Carte OSM Standard',
		type: 'base',
	source: new ol.source.OSM({})
	});

	
  // permet de grouper des cartes par titres
	var mes_cartes = [
	new ol.layer.Group({
	title: 'Carte OSM France',
	layers: [
	carte3]
	}),

	new ol.layer.Group({
	title: 'Carte OSM Standard',
	layers: [
	carte1]
	})
	];


	var LayerSwitcher = new ol.control.LayerSwitcher(); 
  // code ici : https://github.com/walkermatt/ol3-popup/blob/master/src/ol3-popup.js 
	
	myMap = new ol.Map({
        controls: ol.control.defaults().extend([
	new ol.control.ScaleLine(),  // échelle kilométrique	
	LayerSwitcher,
	new ol.control.FullScreen(),  // plein écran
	new ol.control.ZoomToExtent ({
            extent: [
              -505274, 6166259,
             483871, 6180477]
          }) // bouton pour recentrer la carte sur Brest
        ]),        layers: mes_cartes,

        target:'map',
        view: new ol.View({
          center: [498547, 6172374],
          projection: projection,
          zoom: 5.9,
	  minZoom : 3
        })
      });

// Définition de la couche KML 
          		
	KML1 = new ol.layer.Vector({
        source: new ol.source.Vector({
          url: 'Finistère.kml',
          format: new ol.format.KML()
        })
    });
	
		
}
// Fin de la fonction principale
	
	function ResetLayers(){              // enlève les layers sauf carte, les KML dans cet exemple
		myMap.removeLayer(KML1);
		
	}

// Fonction pour l'évenement "clic" sur un bouton
	function ClicBouton(){
		if (myMap.removeLayer(KML1)){
		myMap.removeLayer(KML1);
		} else {
		myMap.addLayer(KML1)};
		
   	}
