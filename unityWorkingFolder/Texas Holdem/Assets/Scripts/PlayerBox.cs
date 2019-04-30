using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class PlayerBox : MonoBehaviour
{
  [SerializeField] GameObject emptyChair;

  GameObject chair;

  // Start is called before the first frame update
  public void Start()
  {
    chair = Instantiate(emptyChair) as GameObject;
    chair.transform.SetParent(gameObject.transform, false);
  }
}
