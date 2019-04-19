using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GameSession : MonoBehaviour
{
  [SerializeField] Image Flop1Image;
  [SerializeField] Image Flop2Image;
  [SerializeField] Image Flop3Image;
  [SerializeField] Image TurnImage;
  [SerializeField] Image RiverImage;

  int numCardsDealt;
  int numCommunityCardsDealt;

  // Start is called before the first frame update
  void Start()
  {
    numCardsDealt = 0;    
    numCommunityCardsDealt = 0;    
  }

  // Update is called once per frame
  void Update()
  {
      
  }

  public void CallButtonPressed()
  {
    Debug.Log("Call");
  }
  
  public void FoldButtonPressed()
  {
    Debug.Log("Fold");
  }

  public void RaiseButtonPressed()
  {
    Debug.Log("Raise");
  }

  public void DealButtonPressed()
  {
    switch (numCommunityCardsDealt)
    {
      case 0:
        DealFlop();
        break;
      case 3:
        DealTurn();
        break;
      case 4:
        DealRiver();
        break;
      case 5:
        Reset();
        break;
    }
  }

  private void DealFlop()
  {
    Flop1Image.sprite = Resources.Load<Sprite>("Sprites/Cards/4h");
    Flop2Image.sprite = Resources.Load<Sprite>("Sprites/Cards/3h");
    Flop3Image.sprite = Resources.Load<Sprite>("Sprites/Cards/2h");
    numCommunityCardsDealt = 3;
  }

  private void DealTurn()
  {
    TurnImage.sprite = Resources.Load<Sprite>("Sprites/Cards/5h");
    numCommunityCardsDealt++;
  }

  private void DealRiver()
  {
    RiverImage.sprite = Resources.Load<Sprite>("Sprites/Cards/6h");
    numCommunityCardsDealt++;
  }

  private void Reset()
  {
    numCommunityCardsDealt = 0;
    Sprite blank = Resources.Load<Sprite>("Sprites/Cards/blankCard");
    Flop1Image.sprite = blank;
    Flop2Image.sprite = blank;
    Flop3Image.sprite = blank;
    TurnImage.sprite = blank;
    RiverImage.sprite = blank;
  }

}
