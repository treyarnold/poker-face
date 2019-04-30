using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;


public class EmptyPlayer : MonoBehaviour
{
  [SerializeField] GameObject activePlayBox;

  GameObject activePlayerBox;
  Vector2 originalPosition;

  // Start is called before the first frame update
  void Start()
  {
    originalPosition = gameObject.transform.position;
  }

  public void SitHere()
  {
    activePlayerBox = Instantiate(activePlayBox) as GameObject;
    GameObject grandParent = transform.parent.parent.gameObject;
    activePlayerBox.transform.SetParent(grandParent.transform, false);
    GameObject newActive = grandParent.transform.GetChild (1).gameObject;
    newActive.transform.position = originalPosition;
    Destroy(transform.parent.gameObject);
  }
}
