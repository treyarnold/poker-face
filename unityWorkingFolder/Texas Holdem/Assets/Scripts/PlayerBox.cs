using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class PlayerBox : MonoBehaviour
{
  [SerializeField] TextMeshProUGUI playerName;
  [SerializeField] TextMeshProUGUI playerFunds;
  [SerializeField] TextMeshProUGUI currentBet;

  // Start is called before the first frame update
  void Start()
  {
    playerName.text = "Trey";
    playerFunds.text = "250k";
    currentBet.text = "10k";
  }

  // Update is called once per frame
  void Update()
  {
    
  }
}
