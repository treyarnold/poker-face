using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class PlayerBox : MonoBehaviour
{
  [SerializeField] TextMeshProUGUI playerName;
  [SerializeField] TextMeshProUGUI playerFunds;
  [SerializeField] TextMeshProUGUI currentBet;
  [SerializeField] GameObject emptyChair;
  [SerializeField] GameObject activePlayBox;

  GameObject chair;
  GameObject activePlayerBox;
  Vector2 originalPosition;

  // Start is called before the first frame update
  public void Start()
  {
    originalPosition = gameObject.transform.position;
    chair = Instantiate(emptyChair) as GameObject;
    chair.transform.SetParent(gameObject.transform, false);
  }

  // Update is called once per frame
  void Update()
  {
    
  }

  public void SitHere()
  {
    // Script myParent = transform.parent.GetComponent<parentscriptclass>();
    // Destroy(chair);
    activePlayerBox = Instantiate(activePlayBox) as GameObject;
    GameObject grandParent = transform.parent.parent.gameObject;
    activePlayerBox.transform.SetParent(grandParent.transform, false);
    GameObject newActive = grandParent.transform.GetChild (1).gameObject;
    Debug.Log(newActive.name);
    newActive.transform.position = originalPosition;
    Destroy(transform.parent.gameObject);
    Debug.Log(transform.parent.parent.name);
  }
}
